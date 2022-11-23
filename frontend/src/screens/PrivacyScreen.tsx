import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import HeroSection from "../components/sections/HeroSection";
import TextHeader from "../components/elements/TextHeader";
import Paragraph from "../components/elements/Paragraph";

export interface PrivacyScreenProps extends ComponentProps<"div"> {}

const PrivacyScreen: FC<PrivacyScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("bg-light-dark", { [className]: className })}>
            <HeroSection heading="Privacy Policy" heading2="Home/Privacy" image="/images/theater.jpeg" />

            <div className="p-8 sm:p-16 container mx-auto">
                <TextHeader className="text-lg tracking-wider text-accent">WWW.THEARTOFFILM.CO.UK</TextHeader>
                <br />
                <div className="flex flex-col space-y-4">
                    <span>Type of website: Ecommerce</span>
                    <span>Effective date: 24th day of January, 2022</span>
                </div>
                <br />

                <div className="flex flex-col space-y-8">
                    <div className="flex flex-col space-y-4">
                        <Paragraph>
                            www.theartoffilm.co.uk (the “Site”) is owned and operated by The Art of Film. The Art of
                            Film is the data controller and can be contacted at:{" "}
                            <a href="mailto:admin@theartoffilm.co.uk">
                                <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                            </a>
                        </Paragraph>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">PURPOSE</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    The purpose of this privacy policy (this “Privacy Policy”) is to inform users of our
                                    Site of the following:
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>The personal data we will collect;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Use of collected data;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Who has access to the data collected;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>The rights of Site users; and</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>The Site’s cookie policy.</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    This Privacy Policy applies in addition to the terms and conditions of our Site.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">GDPR</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    For users in the European Union, we adhere to the Regulation (EU) 2016/679 of the
                                    European Parliament and of the Council of 27 April 2016, known as the General Data
                                    Protection Regulation (the “GDPR”). For users in the United Kingdom, we adhere to
                                    the GDPR as enshrined in the Data Protection Act 2018.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    We have not appointed a Data Protection Officer as we do not fall within the
                                    categories of controllers and processors required to appoint a Data Protection
                                    Officer under Article 37 of the GDPR.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">CONSENT</TextHeader>

                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>By using our Site users agree that they consent to:</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>The conditions set out in this Privacy Policy.</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    When the legal basis for us processing your personal data is that you have provided
                                    your consent to that processing, you may withdraw your consent at any time. If you
                                    withdraw your consent, it will not make processing which we completed before you
                                    withdrew your consent unlawful.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    You can withdraw your consent by: Contacting the Privacy Officer.
                                    <a href="mailto:admin@theartoffilm.co.uk">
                                        <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                                    </a>
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">LEGAL BASIS FOR PROCESSING</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    We collect and process personal data about users in the EU only when we have a legal
                                    basis for doing so under Article 6 of the GDPR.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    We rely on the following legal bases to collect and process the personal data of
                                    users in the EU:
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Users have provided their consent to the processing of their data for one or more
                                    specific purposes; and
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Processing of user personal data is necessary for us or a third pary to pursue a
                                    legitimate interest. Our legitimate interest is not overriden by the interests or
                                    fundamenal rights and freedoms of users. Our legitimate interest(s) are: Movie
                                    poster showcase and the buying and selling of movie posters and memorabilia online.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">PERSONAL DATA WE COLLECT</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    We only collect data that helps us achieve the purpose set out in this Privacy
                                    Policy. We will not collect any additional data beyond the data listed below without
                                    notifying you first.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">DATA COLLECTED AUTOMATICALLY</TextHeader>
                        <Paragraph>
                            When you visit and use our Site, we may automatically collect and store the following
                            information:
                        </Paragraph>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>IP address;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Location;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Clicked links; and Content viewed.</Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">DATA COLLECTED IN A NON-AUTOMATIC WAY</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    We may also collect the following data when you perform certain functions on our
                                    Site:
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    First and last name; Email address; Phone number; Address; and Payment information.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    This data may be collected using the following methods: Subscribing and creating an
                                    account.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-8">
                        <TextHeader className="text-2xl text-accent">HOW WE USE PERSONAL DATA</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    Data collected on our Site will only be used for the purposes specified in this
                                    Privacy Policy or indicated on the relevant pages of our Site.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    We will not use your data beyond what we disclose in this Privacy Policy.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    The data we collect automatically is used for the following purposes: Statistics.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    The data we collect when the user performs certain functions may be used for the
                                    following purposes: Communication; and Payments.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-8">
                        <TextHeader className="text-2xl text-accent">WHO WE SHARE PERSONAL DATA WITH</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    Employees We may disclose user data to any member of our organisation who reasonably
                                    needs access to user data to achieve the purposes set out in this Privacy Policy.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Third Parties We may share user data with the following third parties:
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Posters Sellers We may share the following user data with third parties: Name and
                                    address of where to send the purchased item.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    We may share user data with third parties for the following purposes:
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Third parties will not be able to access user data beyond what is reasonably
                                    necessary to achieve the given purpose.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-8">
                        <TextHeader className="text-2xl text-accent">Other Disclosures</TextHeader>

                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    We will not sell or share your data with other third parties, except in the
                                    following cases: If the law requires it; If it is required for any legal proceeding;
                                    To prove or protect our legal rights; and To buyers or potential buyers of this
                                    company in the event that we seek to sell the company. If you follow hyperlinks from
                                    our Site to another Site, please note that we are not responsible for and have no
                                    control over their privacy policies and practices.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">HOW LONG WE STORE PERSONAL DATA</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    User data will be stored for 6 years. You will be notified if your data is kept for
                                    longer than this period.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    In order to protect your security, we use the strongest available browser encryption
                                    and store all of our data on servers in a secure trusted facility. All data is only
                                    accessible to our employees.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Our employees are bound by strict confidentiality agreements and a breach of this
                                    agreement would result in the employee’s termination.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    While we take all reasonable precautions to ensure that user data is secure and that
                                    users are protected, there always remains the risk of harm.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    The Internet as a whole can be insecure at times and therefore we are unable to
                                    guarantee the security of user data beyond what is reasonably practical.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">INTERNATIONAL DATA TRANSFERS</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    We transfer user personal data to the following countries: All EU Countries; and All
                                    non EU countries.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    When we transfer user personal data we will protect that data as described in this
                                    Privacy Policy and comply with applicable legal requirements for transferring
                                    personal data internationally.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    If you are located in the United Kingdom or the European Union, we will only
                                    transfer your personal data if: The country your personal data is being transferred
                                    to has been deemed to have adequate data protection by the European Commission or,
                                    if you are in the United Kingdom, by the United Kingdom adequacy regulations; or We
                                    have implemented appropriate safeguards in respect of the transfer. For example, the
                                    recipient is a party to binding corporate rules, or we have entered into standard EU
                                    or United Kingdom data protection contractual clauses with the recipient..
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">YOUR RIGHTS AS A USER</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                Under the GDPR, you have the following rights: Right to be informed; Right of access;
                                Right to rectification; Right to erasure; Right to restrict processing; Right to data
                                portability; and Right to object.
                            </li>
                            <li className="list-disc">
                                CHILDREN The minimum age to use our website is 16 years of age. We do not knowingly
                                collect or use personal data from children under 16 years of age.
                            </li>
                            <li className="list-disc">
                                If we learn that we have collected personal data from a child under 16 years of age, the
                                personal data will be deleted as soon as possible.
                            </li>
                            <li className="list-disc">
                                If a child under 16 years of age has provided us with personal data their parent or
                                guardian may contact our privacy officer.
                            </li>
                            <li className="list-disc"></li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">
                            HOW TO ACCESS, MODIFY, DELETE, OR CHALLENGE THE DATA COLLECTED
                        </TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    If you would like to know if we have collected your personal data, how we have used
                                    your personal data, if we have disclosed your personal data and to who we disclosed
                                    your personal data, if you would like your data to be deleted or modified in any
                                    way, or if you would like to exercise any of your other rights under the GDPR,
                                    please contact our privacy officer here: Henry Coleman{" "}
                                    <a href="mailto:admin@theartoffilm.co.uk">
                                        <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                                    </a>
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">DO NOT TRACK NOTICE</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    Do Not Track (“DNT”) is a privacy preference that you can set in certain web
                                    browsers.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    We do not track the users of our Site over time and across third party websites and
                                    therefore do not respond to browser-initiated DNT signals.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    We are not responsible for and cannot guarantee how any third parties who interact
                                    with our Site and your data will respond to DNT signals.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">USE OF COOKIES</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    A cookie is a small file, stored on a user’s hard drive by a website.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Its purpose is to collect data relating to the user’s browsing habits.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>You can choose to be notified each time a cookie is transmitted.</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    You can also choose to disable cookies entirely in your internet browser, but this
                                    may decrease the quality of your user experience.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    We use the following types of cookies on our Site: Functional cookies Functional
                                    cookies are used to remember the selections you make on our Site so that your
                                    selections are saved for your next visits; Analytical cookies Analytical cookies
                                    allow us to improve the design and functionality of our Site by collecting data on
                                    how you access our Site, for example data on the content you access, how long you
                                    stay on our Site, etc; Targeting cookies Targeting cookies collect data on how you
                                    use the Site and your preferences.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    This allows us to personalise the information you see on our Site for you; and
                                    Third-Party Cookies Third-party cookies are created by a website other than ours.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    We may use third-party cookies to achieve the following purposes: Monitor user
                                    preferences to tailor advertisements around their interests.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Modifications This Privacy Policy may be amended from time to time in order to
                                    maintain compliance with the law and to reflect any changes to our data collection
                                    process.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    When we amend this Privacy Policy we will update the “Effective Date” at the top of
                                    this Privacy Policy. We recommend that our users periodically review our Privacy
                                    Policy to ensure that they are notified of any updates.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    If necessary, we may notify users by email of changes to this Privacy Policy.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">COMPLAINTS</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    If you have any complaints about how we process your personal data, please contact
                                    us through the contact methods listed in the Contact Information section so that we
                                    can, where possible, resolve the issue.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    If you feel we have not addressed your concern in a satisfactory manner you may
                                    contact a supervisory authority.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    You also have the right to directly make a complaint to a supervisory authority.
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    You can lodge a complaint with a supervisory authority by contacting the Information
                                    Commissioner’s Office in the UK, Data Protection Commission in Ireland.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">CONTACT INFORMATION</TextHeader>
                        <Paragraph>
                            If you have any questions, concerns or complaints, you can contact our privacy officer,
                            Henry Coleman, at:
                            <a href="mailto:admin@theartoffilm.co.uk">
                                <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                            </a>
                        </Paragraph>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyScreen;
