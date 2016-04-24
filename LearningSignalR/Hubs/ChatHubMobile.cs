using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using LearningSignalR.Models;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace LearningSignalR.Hubs
{
    public class ChatHubMobile : Hub
    {
        public void Send(string sender, string receiver, string message)
        {
            var chat = new Chat() { Message = message, Receiver = receiver, Sender = sender };
            using (var db = new ApplicationDbContext())
            {
                db.Chats.Add(chat);
                db.SaveChanges();
            }
            Clients.Others.signalrnotification(new { NotificationType = "MESSAGE_RECEIVED", data= chat});
            Clients.Caller.signalrnotification(new { NotificationType = "MESSAGE_SENT", data = chat });
        }

        public void ComeOnline(string sender)
        {
            Chat temp = new Chat() { Sender = sender };
            Clients.Others.signalrnotification(new { NotificationType = "CAME_ONLINE", data = temp });
        }

    }
}