import ApplicantsCounter from "./applicants-counter";
import EventsInsight from "./events-insight";
import FeesStatus from "./fees-status";
import MembersCounter from "./member-counter";
import TasksWidget from "./tasks-widget";

export default function Admin(){
    return <div>
        <div className="grid grid-cols-5 gap-5">
            <MembersCounter />
            <ApplicantsCounter />
            <FeesStatus />
            <div className="col-span-2 row-span-2">
                <EventsInsight />
            </div>
            <div className="col-span-3 row-span-2">
                <TasksWidget />
            </div>
        </div>
    </div>
}