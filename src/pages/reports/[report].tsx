import { useRouter } from "next/router"

export default function Report() {
    const router = useRouter()
    const reportNumber = router.query.report

    return (
        <div>Report report: {reportNumber}</div>
    )
}