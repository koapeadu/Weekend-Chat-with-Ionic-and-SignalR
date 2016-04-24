using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using LearningSignalR.Models;
using System.Web.Http;

namespace LearningSignalR.Controllers
{
    public class ChatsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Chats
        public IEnumerable<Chat> Get()
        {
            return db.Chats.ToList();
        }

        // GET: Chats between a sender and a recipient
        public IEnumerable<Chat> Get(string sender, string recipient)
        {
              return db.Chats.Where(c => c.Sender == sender && c.Receiver == recipient).ToList();
        }

        // POST api/values
        public void Post([FromBody]Chat chat)
        {
            db.Chats.Add(chat);
            db.SaveChanges();
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
