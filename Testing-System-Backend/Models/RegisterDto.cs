namespace Testing_System_Backend.Models
{
    public class RegisterDto
    {
        // Personal Info Fields
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string Cnic { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string Password { get; set; }

        // Education Data (JSON stringified from Frontend)
        public string EducationData { get; set; }

        // List of Files
        public List<IFormFile> Files { get; set; }
    }
}
