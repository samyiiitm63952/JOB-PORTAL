import React from 'react'
import Navbar from './Navbar'

const Section = ({ title, children }) => (
    <div className='mb-8'>
        <h2 className='text-xl font-semibold text-gray-800 mb-3 border-l-4 border-[#6A38C2] pl-3'>{title}</h2>
        <div className='text-gray-600 text-sm leading-relaxed space-y-2'>{children}</div>
    </div>
)

const TermsofService = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto px-6 py-16'>
                {/* Header */}
                <div className='mb-12 text-center'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-3'>
                        Terms of <span className='text-[#6A38C2]'>Service</span>
                    </h1>
                    <p className='text-gray-500 text-sm'>Last updated: August 30, 2026</p>
                    <p className='text-gray-500 text-sm mt-2'>
                        Please read these terms carefully before using <span className='font-medium text-[#6A38C2]'>JobHunt</span>.
                    </p>
                </div>

                <Section title="1. Acceptance of Terms">
                    <p>By accessing or using JobHunt, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.</p>
                    <p className='mt-2'>We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
                </Section>

                <Section title="2. Eligibility">
                    <p>You must be at least 16 years of age to use JobHunt. By creating an account, you confirm that:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li>You are at least 16 years old</li>
                        <li>You have the legal capacity to enter into a binding agreement</li>
                        <li>You are not barred from using the service under applicable law</li>
                    </ul>
                </Section>

                <Section title="3. User Accounts">
                    <p>When you create an account on JobHunt, you agree to:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li>Provide accurate, current, and complete information</li>
                        <li>Maintain and update your information to keep it accurate</li>
                        <li>Keep your password secure and confidential</li>
                        <li>Notify us immediately of any unauthorized access to your account</li>
                        <li>Take responsibility for all activity under your account</li>
                    </ul>
                    <p className='mt-2'>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p>
                </Section>

                <Section title="4. Acceptable Use">
                    <p>You agree NOT to use JobHunt to:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li>Post false, misleading, or fraudulent job listings or profiles</li>
                        <li>Harass, abuse, or harm other users or employers</li>
                        <li>Scrape, crawl, or collect data from the platform without authorization</li>
                        <li>Transmit spam, malware, or any malicious code</li>
                        <li>Impersonate any person, company, or entity</li>
                        <li>Use the platform for any illegal or unauthorized purpose</li>
                    </ul>
                </Section>

                <Section title="5. Job Listings & Applications">
                    <p>JobHunt acts as an intermediary between job seekers and employers. We do not guarantee:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li>The accuracy or legitimacy of any job listing</li>
                        <li>That applying for a job will result in employment</li>
                        <li>The conduct or reliability of any employer or candidate</li>
                    </ul>
                    <p className='mt-2'>You are solely responsible for verifying the authenticity of job postings before applying or sharing personal information with employers.</p>
                </Section>

                <Section title="6. Intellectual Property">
                    <p>All content on JobHunt — including logos, text, graphics, and software — is the property of JobHunt or its licensors and is protected by applicable intellectual property laws.</p>
                    <p className='mt-2'>You may not reproduce, distribute, modify, or create derivative works without our prior written consent. By uploading content (e.g., your resume), you grant JobHunt a non-exclusive, royalty-free license to use that content to provide our services.</p>
                </Section>

                <Section title="7. Privacy">
                    <p>Your use of JobHunt is also governed by our <a href='/PrivacyPolicy' className='text-[#6A38C2] hover:underline'>Privacy Policy</a>, which is incorporated into these Terms of Service by reference. Please review it carefully to understand how we collect and use your information.</p>
                </Section>

                <Section title="8. Disclaimers & Limitation of Liability">
                    <p>JobHunt is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without warranties of any kind. We do not warrant that:</p>
                    <ul className='list-disc list-inside space-y-1 mt-2 ml-2'>
                        <li>The platform will be uninterrupted or error-free</li>
                        <li>Job listings are accurate, complete, or up to date</li>
                        <li>Results obtained from using the platform will be accurate or reliable</li>
                    </ul>
                    <p className='mt-2'>To the maximum extent permitted by law, JobHunt shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.</p>
                </Section>

                <Section title="9. Termination">
                    <p>We may suspend or terminate your access to JobHunt at any time, with or without notice, if we believe you have violated these Terms of Service.</p>
                    <p className='mt-2'>You may also delete your account at any time by contacting us at <a href='mailto:support@jobhunt.com' className='text-[#6A38C2] hover:underline'>support@jobhunt.com</a>. Upon termination, your right to use the platform ceases immediately.</p>
                </Section>

                <Section title="10. Governing Law & Contact">
                    <p>These Terms of Service are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.</p>
                    <p className='mt-2'>For questions about these terms, contact us at:</p>
                    <ul className='list-none mt-2 ml-2 space-y-1'>
                        <li>📧 <a href='mailto:legal@jobhunt.com' className='text-[#6A38C2] hover:underline'>legal@jobhunt.com</a></li>
                        <li>📍 123 Tech Park, Bengaluru, Karnataka, India — 560001</li>
                        <li>📞 +91 123 456 7890</li>
                    </ul>
                </Section>

                <div className='mt-12 p-4 bg-[#6A38C2]/5 border border-[#6A38C2]/20 rounded-lg text-sm text-gray-500 text-center'>
                    By using JobHunt, you agree to abide by these Terms of Service.
                </div>
            </div>
        </div>
    )
}

export default TermsofService