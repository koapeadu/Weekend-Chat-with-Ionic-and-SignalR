using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearningSignalR.Models
{
    public class Chat
    {
        public Chat()
        {
            Icon = Chat.Icons[new Random().Next(Icons.Count)];
        }

        [Key]
        public int Id { get; set; }

        public string Sender { get; set; }

        public string Receiver { get; set; }

        public string Message { get; set; }

        [NotMapped]
        public string Icon;

        [NotMapped]
        private static List<string> Icons = new List<string>() { "img/ben.png", "img/max.png", "img/adam.jpg", "img/perry.png", "img/mike.png" };
    }
}
