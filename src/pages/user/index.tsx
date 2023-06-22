import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/auth/authSlice';

export default function User() {
    const user = useAppSelector(selectUser);

    return (
        <div className="page">
            <div>Email: {user.email}</div>
            <div>Change password</div>
            <div>Current project: {user.project}</div>
            <div>Change project</div>
            <div>Project team: 23 users</div>
            <div>Set project team members</div>
        </div>
    );
}
