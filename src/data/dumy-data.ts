import { User } from '@/types/user';

const superUsers: User[] = [
    {
        project: 'Audits',
        department: '',
        email: 'raff@acme.pl',
        password: 'admin1234',
        name: 'raff raff',
    },
    {
        project: 'Reports',
        department: '',
        email: 'raff@acme.pl',
        password: 'admin1234',
        name: 'raff raff',
    },
];

const users: User[] = [
    {
        project: 'Audits',
        department: 'dep1',
        email: 'raff@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
    {
        project: 'Audits',
        department: 'dep1',
        email: 'dep1a@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
    {
        project: 'Audits',
        department: 'dep1',
        email: 'dep1b@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
    {
        project: 'Audits',
        department: 'dep2',
        email: 'dep2@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
    {
        project: 'Audits',
        department: 'dep2',
        email: 'dep2a@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
    {
        project: 'Audits',
        department: 'dep3',
        email: 'dep3@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
    {
        project: 'Audits',
        department: 'dep4',
        email: 'dep4@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
    {
        project: 'Audits',
        department: 'dep5',
        email: 'dep5@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
    {
        project: 'Audits',
        department: 'dep6',
        email: 'dep6@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
    {
        project: 'Audits',
        department: 'dep7',
        email: 'dep7@acme.pl',
        name: 'name surname',
        password: 'test1234',
    },
];

function isValidUser(userData: User, array: User[]): User | undefined {
    const isValidUser = array.find(
        (el) =>
            userData.project === el.project &&
            userData.email === el.email &&
            userData.password === el.password
    );
    return isValidUser;
}

export async function logIn(userData: User) {
    let response = {
        status: 'rejected',
        message: 'Invalid password or user name.',
        user: {
            project: '',
            email: '',
            department: '',
            isLoged: false,
            role: '',
        },
    };

    let user: User | undefined;
    let role = 'superUser';
    user = isValidUser(userData, superUsers);
    if (!user) {
        user = isValidUser(userData, users);
        role = 'user';
    }
    if (user) {
        response = {
            status: 'success',
            message: 'Welcome back!',
            user: {
                project: user.project,
                email: user.email,
                department: user.department!,
                isLoged: true,
                role,
            },
        };
    }
    return response;
}

export async function logOut() {
    const response = {
        status: 'success',
        message: 'Logged out successfully!',
        user: {
            project: '',
            email: '',
            department: '',
            isLoged: false,
            role: '',
        },
    };
    return response;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
const departments = [
    {
        name: 'dep1',
    },
    {
        name: 'dep2',
    },
    {
        name: 'dep3',
    },
    {
        name: 'dep4',
    },
    {
        name: 'dep5',
    },
    {
        name: 'dep6',
    },
    {
        name: 'dep7',
    },
];

const reports = [
    {
        header: 'Report header name',
        footer: 'Report footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer',
        title: 'Report full name goes here',
        number: '1/2022',
        date_audit: '10.10.2022',
        date_report: '10.10.2022',
        auditors: 'Auditor 1, auditor 2',
        receivers: 'receivers',
        finished: 'true',
    },
    {
        header: 'Report header name',
        footer: 'Report footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer',
        title: 'Report full name goes here',
        number: '2/2022',
        date_audit: '10.10.2022',
        date_report: '10.10.2022',
        auditors: 'Auditor 1, auditor 2',
        receivers: 'receivers',
        finished: 'true',
    },
    {
        header: 'Report header name',
        footer: 'Report footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer',
        title: 'Report full name goes here',
        number: '3/2022',
        date_audit: '10.10.2022',
        date_report: '10.10.2022',
        auditors: 'Auditor 1, auditor 2',
        receivers: 'receivers',
        finished: 'true',
    },
    {
        header: 'Report header name',
        footer: 'Report footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer',
        title: 'Report full name goes here',
        number: '4/2022',
        date_audit: '10.10.2022',
        date_report: '10.10.2022',
        auditors: 'Auditor 1, auditor 2',
        receivers: 'receivers',
        finished: 'true',
    },
    {
        header: 'Report header name',
        footer: 'Report footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer',
        title: 'Report full name goes here',
        number: '5/2022',
        date_audit: '10.10.2022',
        date_report: '10.10.2022',
        auditors: 'Auditor 1, auditor 2',
        receivers: 'receivers',
        finished: 'true',
    },
];

const pages = [
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
    {
        report_number: '1/2022',
        date_audit: '10.10.2022',
        department: 'dep1',
        place: 'place',
        description:
            'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
        type: 'duża',
        foto_1: 'foto1.jpg',
        foto_2: 'foto2.jpg',
        foto_3: 'foto3.jpg',
        foto_4: 'foto4.jpg',
        status: 'false',
        date_status: '10.10.2022',
    },
];
