import { useRouter } from "next/router"

export default function ReportPage() {
    const router = useRouter()
    const pageNumber = router.query.page

    return (
        <div className='page'>Report page: {pageNumber}</div>
    )
}