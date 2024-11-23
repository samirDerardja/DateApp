using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public partial class AppUser
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public required string Url { get; set; }
        public bool IsMain { get; set; }
        public string? PublicId { get; set; }
        public int AppUserId { get; set; }

        public AppUser AppUser { get; set; } = null!;
    }

}