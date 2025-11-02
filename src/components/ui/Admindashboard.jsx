import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSidebar";
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/userSlice";
import { User } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [date, setDate] = useState(new Date())
    const { loggedInUser } = useSelector((state) => state.user);
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
                {/* left side */}
                <AppSidebar />

                {/* middle + right section */}
                <div className="flex flex-1 bg-gray-50">
                    {/* middle */}
                    <section className="flex-1 p-6 overflow-y-auto">
                        {/* top bar inside your section */}
                        <div className="flex items-center justify-between mb-6">

                            <SidebarTrigger />


                            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                                    <User className="text-gray-600 w-4 h-4" />
                                </div>
                                <span className="font-medium text-gray-700">
                                    {loggedInUser?.username || "Admin"}
                                </span>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="ml-2"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-4">Announcements</h2>
                        <div className="bg-white rounded-2xl shadow p-4 mb-6">
                            <p>Achievements, news, and updates...</p>
                        </div>
                    </section>

                    {/* right side */}
                    <aside className="w-[22rem] p-4 border-l bg-gray-100 flex flex-col gap-6 h-screen sticky top-0">
                        <div className="bg-white rounded-2xl p-4 shadow flex-1">
                            <h2 className="text-lg font-semibold mb-2">Upcoming Events...</h2>
                            <ul className="text-sm space-y-2">
                                <li>No events.</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-4 shadow flex-1">
                            <h2 className="text-lg font-semibold mb-2">Calendar</h2>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-lg border"
                            />
                        </div>
                    </aside>
                </div>
            </div>
        </SidebarProvider>
    );
}
