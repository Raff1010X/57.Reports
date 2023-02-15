import { useRouter } from 'next/router';

export default function ReportPage() {
    const router = useRouter();
    let report, page;
    if (router.query.report_page) {
        report = [...router.query.report_page[0]];
        page = [...router.query.report_page[1]];
    }

    return (
        <div className='page'>
            <p>Report:{report}</p>
            <p>Page:{page}</p>
        </div>
    );
}
