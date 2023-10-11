// import { useAppSelector } from '@/store/hooks';
// import { selectUser } from '@/store/slices/auth/authSlice';
import { Button } from "@nextui-org/react";

export default function User() {
    // const user = useAppSelector(selectUser);

    return (
        <div className="page">
            <div className="page-content">
                User Info Page
                <Button color="primary">
                    Button
                </Button>
                {/* <div>Project name: {user.project}</div>
                <br/>
                <div>User email: {user.email}</div>
                <br/>
                <div>Change password</div> */}
            </div>
        </div>
    );
}
