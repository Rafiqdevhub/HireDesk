interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal = ({
  isOpen,
  onClose,
}: PrivacyPolicyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative z-50 flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-slate-800 rounded-lg shadow-xl border border-slate-700 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto flex-1 px-6 py-4 text-slate-300 space-y-4 text-sm">
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                Introduction
              </h3>
              <p>
                HireDesk ("we", "our", "us", or "Company") operates the HireDesk
                website. This page informs you of our policies regarding the
                collection, use, and disclosure of personal data when you use
                our service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                1. Information Collection and Use
              </h3>
              <p>
                We collect several different types of information for various
                purposes to provide and improve our service to you.
              </p>
              <div className="mt-3 space-y-2 ml-2">
                <div>
                  <h4 className="font-semibold text-white">Personal Data:</h4>
                  <p>
                    While using our service, we may ask you to provide us with
                    certain personally identifiable information that can be used
                    to contact or identify you ("Personal Data"). This may
                    include, but is not limited to:
                  </p>
                  <ul className="list-disc list-inside mt-1 ml-2 space-y-1">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Company name and industry</li>
                    <li>Cookies and Usage Data</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                2. Use of Data
              </h3>
              <p>HireDesk uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>
                  To allow you to participate in interactive features of our
                  service when you choose to do so
                </li>
                <li>To provide customer care and support</li>
                <li>
                  To gather analysis or valuable information for improvement
                </li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Security of Data
              </h3>
              <p>
                The security of your data is important to us, but remember that
                no method of transmission over the Internet or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we
                cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                4. Changes to This Privacy Policy
              </h3>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Effective Date" at the top of this
                Privacy Policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                5. Contact Us
              </h3>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                <li>By email: privacy@hiredesk.com</li>
                <li>By visiting our contact page</li>
                <li>By phone: [Contact phone number]</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                6. California Privacy Rights
              </h3>
              <p>
                If you are a California resident, you have specific rights under
                the California Consumer Privacy Act (CCPA). You have the right
                to know what personal information is collected, used, shared or
                sold, delete personal information collected from you, and not be
                discriminated against for exercising your CCPA rights.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                7. Third-Party Links
              </h3>
              <p>
                Our service may contain links to other sites that are not
                operated by us. This Privacy Policy applies only to information
                we collect. We have no control over and assume no responsibility
                for the content, privacy policies or practices of any third
                party sites or services.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                8. Children's Privacy
              </h3>
              <p>
                Our service does not address anyone under the age of 18
                ("Child"). We do not knowingly collect personally identifiable
                information from anyone under the age of 18. If you are a parent
                or guardian and you are aware that your Child has provided us
                with Personal Data, please contact us.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                9. Your Rights
              </h3>
              <p>
                You have the right to request a copy of the information we hold
                about you. If you believe we hold any incomplete or inaccurate
                information about you, you can request us to correct or remove
                the information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
