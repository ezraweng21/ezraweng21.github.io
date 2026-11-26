import Link from "next/link";
import { bucketList } from "@/data/interests";

export const metadata = { title: "Bucket list & plans" };

export default function BucketListPage() {
  return <div className="folio interest-journal">
    <Link href="/personal#bucket-list">Back to interests</Link>
    <h1>Bucket list &amp; plans</h1>
    <ul>{bucketList.map(plan => <li key={plan}>{plan}</li>)}</ul>
  </div>;
}
