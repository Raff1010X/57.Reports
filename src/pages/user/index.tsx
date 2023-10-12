// import { useAppSelector } from '@/store/hooks';
// import { selectUser } from '@/store/slices/auth/authSlice';
import { Button } from "@nextui-org/react";
import {Pagination} from "@nextui-org/react";

export default function User() {
    // const user = useAppSelector(selectUser);

    return (
        <div className="page">
            <div className="page-content">
                User Info Page
                <div className="border-solid border-2 bg-black w-96">Button</div>
                <Button color="primary" className="w-1/2 hover:w-full">
                    Button
                </Button>
                <Pagination siblings={3} boundaries={3} total={20} initialPage={1} color={"primary"} />
                {/* <div>Project name: {user.project}</div>
                <br/>
                <div>User email: {user.email}</div>
                <br/>
                <div>Change password</div> */}
            </div>
        </div>
    );
}
