import { useRouter } from "next/router"

export default function Report() {
    const router = useRouter()
    const reportNumber = router.query.report

    return (
        <div className='page'>Report report: {reportNumber}</div>
    )
}