import type { TermsOfServiceModalProps } from "@app-types/components";

export const TermsOfServiceModal = ({
  isOpen,
  onClose,
}: TermsOfServiceModalProps) => {
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
            <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
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
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing and using HireDesk, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                2. Use License
              </h3>
              <p>
                Permission is granted to temporarily download one copy of the
                materials (information or software) on HireDesk for personal,
                non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may
                not:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Modifying or copying the materials</li>
                <li>
                  Using the materials for any commercial purpose or for any
                  public display
                </li>
                <li>
                  Attempting to decompile or reverse engineer any software
                  contained on the site
                </li>
                <li>Removing any copyright or other proprietary notations</li>
                <li>
                  Transferring the materials to another person or location
                </li>
                <li>
                  Violating any applicable laws or regulations related to the
                  access to or use of the service
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Disclaimer
              </h3>
              <p>
                The materials on HireDesk's website are provided on an 'as is'
                basis. HireDesk makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                4. Limitations
              </h3>
              <p>
                In no event shall HireDesk or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on HireDesk's website.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                5. Accuracy of Materials
              </h3>
              <p>
                The materials appearing on HireDesk's website could include
                technical, typographical, or photographic errors. HireDesk does
                not warrant that any of the materials on the website are
                accurate, complete, or current. HireDesk may make changes to the
                materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                6. Links
              </h3>
              <p>
                HireDesk has not reviewed all of the sites linked to its website
                and is not responsible for the contents of any such linked site.
                The inclusion of any link does not imply endorsement by HireDesk
                of the site. Use of any such linked website is at the user's own
                risk.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                7. Modifications
              </h3>
              <p>
                HireDesk may revise these terms of service for its website at
                any time without notice. By using this website you are agreeing
                to be bound by the then current version of these terms of
                service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                8. Governing Law
              </h3>
              <p>
                These terms and conditions are governed by and construed in
                accordance with the laws of the jurisdiction in which HireDesk
                operates, and you irrevocably submit to the exclusive
                jurisdiction of the courts located in that location.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">
                9. Contact Information
              </h3>
              <p>
                If you have any questions about these Terms of Service, please
                contact us at support@hiredesk.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
