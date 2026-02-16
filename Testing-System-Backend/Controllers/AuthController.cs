using BCrypt.Net; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json; 
using Testing_System_Backend.Data;
using Testing_System_Backend.Models;

namespace TestingSystemBeckend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment; // File save karne ke liye rasta batata hai

        // Constructor Injection
        public AuthController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto dto)
        {
            // 1. Validation: Check karein ke Email pehle se maujood to nahi
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "Email already exists!" });
            }

            // 2. Password Security (Hashing)
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // 3. User Object Banana (Frontend data se)
            var user = new User
            {
                Name = dto.Name,
                FatherName = dto.FatherName,
                CNIC = dto.Cnic,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                City = dto.City,
                PasswordHash = passwordHash
            };

            // Transaction shuru (Agar Education save na ho, to User bhi save nahi hoga - Safety)
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // A. User ko Database mein save karein
                _context.Users.Add(user);
                await _context.SaveChangesAsync(); // Yahan User ko ID mil jayegi

                // B. Education Data aur Files Handle karein
                if (!string.IsNullOrEmpty(dto.EducationData))
                {
                    // JSON string ko List mein convert karein
                    var educationList = JsonConvert.DeserializeObject<List<Education>>(dto.EducationData);

                    // Check karein ke education entries hain ya nahi
                    if (educationList != null)
                    {
                        for (int i = 0; i < educationList.Count; i++)
                        {
                            var edu = educationList[i];
                            edu.UserId = user.Id; // User ki ID link karein

                            // Agar user ne file upload ki hai (Check matching index)
                            if (dto.Files != null && dto.Files.Count > i)
                            {
                                var file = dto.Files[i];
                                if (file.Length > 0)
                                {
                                    // File ka unique naam banayein
                                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                                    // Uploads folder ka rasta
                                    var uploadPath = Path.Combine(_environment.ContentRootPath, "Uploads");

                                    // Agar folder nahi hai to bana lein
                                    if (!Directory.Exists(uploadPath))
                                        Directory.CreateDirectory(uploadPath);

                                    var filePath = Path.Combine(uploadPath, fileName);

                                    // File ko server par save karein
                                    using (var stream = new FileStream(filePath, FileMode.Create))
                                    {
                                        await file.CopyToAsync(stream);
                                    }

                                    // Database mein path save karein
                                    edu.FilePath = fileName;
                                }
                            }

                            _context.Educations.Add(edu);
                        }
                        await _context.SaveChangesAsync();
                    }
                }

                // C. Sab kuch sahi hua, Transaction commit karein
                await transaction.CommitAsync();

                return Ok(new { message = "Registration Successful!", userId = user.Id });
            }
            catch (Exception ex)
            {
                // Agar koi error aaye to sab wapas (Rollback)
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Registration Failed", error = ex.Message });
            }
        }
    }
}