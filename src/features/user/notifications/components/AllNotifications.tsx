import {notifications} from "@/features/user/notifications/data.ts";
import NotificationOptions from "@/features/user/notifications/components/NotificationOptions.tsx";

function AllNotifications() {
    return (
        <div className="space-y-3">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`flex items-start space-x-4 p-4 rounded-md border transition-all duration-200
                    ${notification.isRead ? "bg-gray-100" : "bg-blue-50 border-blue-200"}`}
                >
                    <div className="flex-shrink-0">
                        <img
                            src={notification.sender.avatarUrl}
                            alt={notification.sender.displayName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-2">
                                    <strong className="text-sm font-bold">{notification.sender.displayName}</strong>
                                    <small className="text-xs text-gray-500">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </small>
                                </div>

                                <p className="text-sm text-gray-800 mt-2 line-clamp-2">
                                    {notification.content}
                                </p>
                            </div>

                            <div className="ml-2">
                                <NotificationOptions
                                    onMarkAsRead={() => console.log(`Mark as read: ${notification.id}`)}
                                    onDelete={() => console.log(`Delete notification: ${notification.id}`)}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default AllNotifications;