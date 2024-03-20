using Microsoft.AspNetCore.SignalR;

namespace SignalR_Sample.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; }
        public static int TotalUsers { get; set; }

        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            Clients.All.SendAsync("updatedTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updatedTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }

        public async Task NewWindowLoaded()
        {
            TotalViews++;
            //send update to all clients total views have been updated
            await Clients.All.SendAsync("updatedTotalViews", TotalViews);
        }


    }
}
