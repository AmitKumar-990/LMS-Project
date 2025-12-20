import PageWrapper from "./PageWrapper";

export default function HelpCenter() {
  return (
    <PageWrapper title="Help Center">
      <p>
        Need help? We’re here for you.
      </p>
      <ul className="list-disc pl-6">
        <li>Account & Login issues</li>
        <li>Course access problems</li>
        <li>Payments & certificates</li>
      </ul>
    </PageWrapper>
  );
}
