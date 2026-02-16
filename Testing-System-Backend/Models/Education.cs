namespace Testing_System_Backend.Models
{
    public class Education
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Level { get; set; } // React: level
        public string Title { get; set; } // React: title
        public string StartDate { get; set; } // React: startDate
        public string EndDate { get; set; } // React: endDate
        public string FilePath { get; set; } // Path of the uploaded 'file'
    }
}
