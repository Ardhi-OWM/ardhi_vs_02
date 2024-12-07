export function HelpNotice() {
    return (
        <div className="p-4  ">
           
            {/* Notification Section */}
            <div className="notification-section">
                {/* <h2 className="text-l font-semibold mb-2">Notifications</h2> */}
                <div className="notifications-list">
                    <span className="text-sm border-gray-500/[.25]">
                        🔔  <a href="https://ardhi.de" className="hover:text-ourGreen hover:underline px-3">Notification</a>
                    </span>
                </div>
            </div>
             {/* Help Section */}
             <div className="help-section">
                {/* <h2 className="text-l font-semibold mb-2">Help</h2> */}
                <div className="mt-4  border-gray-500/[.25]">
                    <span className="text-sm ">
                    📖 
                        <a href="https://ardhi.slab.com/posts/help-page-idwmu284?shr=_TwiAyo7tThV4H3IWU7pmshx"
                            className="hover:text-ourGreen hover:underline px-3" > Help page </a> 
                    </span>
                </div>
            </div>

        </div>
    );
}
