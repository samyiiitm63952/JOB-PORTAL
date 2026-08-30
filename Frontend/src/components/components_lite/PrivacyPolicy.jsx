import React from 'react'
import Navbar from './Navbar'

const Section = ({ title, children }) => (
    <div className='mb-8'>
        <h2 className='text-xl font-semibold text-gray-800 mb-3 border-l-4 border-[#6A38C2] pl-3'>{title}</h2>
        <div className='text-gray-600 text-sm leading-relaxed space-y-2'>{children}</div>
    </div>
)

const PrivacyPolicy = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto px-6 py-16'>
                {/* Header */}
                <div className='mb-12 text-center'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-3'>
                        Privacy <span className='text-[#6A38C2]'>Policy</span>
                    </h1>
                    <p className='text-gray-500 text-sm'>Last updated: August 30, 2026</p>
                    <p className='text-gray-500 text-sm mt-2'>
                        This policy applies to all services offered by <span className='font-medium text-[#6A38C2]'>JobHunt</span>.
                    </p>
                </div>

                <Section title="1. Information We Collect">
                    <p>We collect information you provide directly, such as when you create an account, apply for jobs, or contact us. This includes:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li>Full name, email address, phone number</li>
                        <li>Resume / CV and portfolio links</li>
                        <li>Work experience, education, and skills</li>
                        <li>Profile photo (optional)</li>
                        <li>Job preferences and search history</li>
                    </ul>
                    <p className='mt-2'>We also automatically collect usage data such as IP address, browser type, pages visited, and device information through cookies and analytics tools.</p>
                </Section>

                <Section title="2. How We Use Your Information">
                    <p>We use the information we collect to:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li>Create and manage your account</li>
                        <li>Match you with relevant job opportunities</li>
                        <li>Share your profile with employers (only when you apply)</li>
                        <li>Send job alerts, notifications, and platform updates</li>
                        <li>Improve our services through analytics</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </Section>

                <Section title="3. Sharing Your Information">
                    <p>We do <strong>not</strong> sell your personal data. We may share your information with:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li><strong>Employers</strong> — when you apply for a job or make your profile public</li>
                        <li><strong>Service providers</strong> — third parties that help us operate our platform (e.g., cloud storage, email services)</li>
                        <li><strong>Legal authorities</strong> — when required by law or to protect our rights</li>
                    </ul>
                    <p className='mt-2'>All third-party partners are bound by confidentiality agreements and are prohibited from using your data for their own purposes.</p>
                </Section>

                <Section title="4. Cookies & Tracking">
                    <p>We use cookies and similar technologies to enhance your experience. These include:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li><strong>Essential cookies</strong> — required for the site to function</li>
                        <li><strong>Analytics cookies</strong> — help us understand how users interact with the platform</li>
                        <li><strong>Preference cookies</strong> — remember your settings and preferences</li>
                    </ul>
                    <p className='mt-2'>You can manage or disable cookies through your browser settings. Note that disabling some cookies may affect platform functionality.</p>
                </Section>

                <Section title="5. Data Retention">
                    <p>We retain your personal data for as long as your account is active or as needed to provide our services. You may request deletion of your account and associated data at any time by contacting us. We may retain certain data as required by law.</p>
                </Section>

                <Section title="6. Data Security">
                    <p>We implement industry-standard security measures including:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li>HTTPS encryption for all data in transit</li>
                        <li>Secure password hashing</li>
                        <li>Access controls limiting who can view your data internally</li>
                        <li>Regular security audits</li>
                    </ul>
                    <p className='mt-2'>While we take these precautions seriously, no system is 100% secure. Please use a strong, unique password for your account.</p>
                </Section>

                <Section title="7. Your Rights">
                    <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li><strong>Access</strong> — Request a copy of the data we hold about you</li>
                        <li><strong>Correction</strong> — Update or correct inaccurate information</li>
                        <li><strong>Deletion</strong> — Request removal of your personal data</li>
                        <li><strong>Portability</strong> — Receive your data in a structured, machine-readable format</li>
                        <li><strong>Opt-out</strong> — Unsubscribe from marketing communications at any time</li>
                    </ul>
                    <p className='mt-2'>To exercise any of these rights, email us at <a href='mailto:privacy@jobhunt.com' className='text-[#6A38C2] hover:underline'>privacy@jobhunt.com</a>.</p>
                </Section>

                <Section title="8. Children's Privacy">
                    <p>JobHunt is not directed at individuals under the age of 16. We do not knowingly collect personal information from minors. If you believe a child has provided us with their information, please contact us immediately.</p>
                </Section>

                <Section title="9. Changes to This Policy">
                    <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our platform. Continued use of our services after changes take effect constitutes acceptance of the revised policy.</p>
                </Section>

                <Section title="10. Contact Us">
                    <p>If you have any questions or concerns about this Privacy Policy, please reach out:</p>
                    <ul className='list-none mt-2 ml-2 space-y-1'>
                        <li>📧 <a href='mailto:privacy@jobhunt.com' className='text-[#6A38C2] hover:underline'>privacy@jobhunt.com</a></li>
                        <li>📍 123 Tech Park, Bengaluru, Karnataka, India — 560001</li>
                        <li>📞 +91 123 456 7890</li>
                    </ul>
                </Section>

                <div className='mt-12 p-4 bg-[#6A38C2]/5 border border-[#6A38C2]/20 rounded-lg text-sm text-gray-500 text-center'>
                    By using JobHunt, you agree to the terms outlined in this Privacy Policy.
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
