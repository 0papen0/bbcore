namespace Lib.WebServer
{
    public interface ILongPollingConnection
    {
        string UserAgent { get; }
        string Id { get; }
        void Send(string message, object data);
        void Close();
    }
}
