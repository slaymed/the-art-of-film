import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import TextHeader from "../components/elements/TextHeader";
import Paragraph from "../components/elements/Paragraph";
import HeroSection from "../components/sections/HeroSection";

export interface TermsScreenProps extends ComponentProps<"div"> {}

const TermsScreen: FC<TermsScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("bg-light-dark", { [className]: className })}>
            <HeroSection heading="Privacy Policy" heading2="Home/Privacy" image="/images/theater.jpeg" />

            <div className="p-8 sm:p-16 container mx-auto">
                <TextHeader className="text-lg tracking-wider text-accent">WWW.THEARTOFFILM.CO.UK</TextHeader>

                <div className="flex flex-col space-y-8">
                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">The Art of Film</TextHeader>
                        <Paragraph>
                            These terms and conditions (the “Terms and Conditions”) govern the use
                            of&nbsp;www.theartoffilm.co.uk&nbsp;(the “Site”). This Site is owned and operated by Henry
                            Coleman. This Site is an ecommerce website.
                        </Paragraph>
                        <Paragraph>
                            By using this Site, you indicate that you have read and understand these Terms and
                            Conditions and agree to abide by them at all times.
                        </Paragraph>
                        <Paragraph>
                            THESE TERMS AND CONDITIONS CONTAIN A DISPUTE RESOLUTION CLAUSE THAT IMPACTS YOUR RIGHTS
                            ABOUT HOW TO RESOLVE DISPUTES. PLEASE READ IT CAREFULLY.
                        </Paragraph>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Intellectual Property</TextHeader>
                        <Paragraph>
                            All digital content published and made available on our Site is the property of Henry
                            Coleman and the Site’s creators. This includes, but is not limited to images, text, logos,
                            documents, downloadable files and anything that contributes to the composition of our Site.
                        </Paragraph>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">The Minimum Age</TextHeader>
                        <Paragraph>
                            The minimum age to use our Site is 16 years old. By using this Site, users agree that they
                            are over 16 years old. We do not assume any legal responsibility for false statements about
                            age.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Acceptable Use</TextHeader>
                        <Paragraph>
                            As a user of our Site, you agree to use our Site legally, not to use our Site for illegal
                            purposes, and not to:
                        </Paragraph>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>Harass or mistreat other users of our Site;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Violate the rights of other users of our Site;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    {" "}
                                    Violate the intellectual property rights of the Site owners or any third party to
                                    the Site;
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Hack into the account of another user of the Site;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Act in any way that could be considered fraudulent; or</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Post any material that may be deemed inappropriate or offensive.</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Any adult material published will be moderated the site Admin, and if deemed
                                    inappropriate will be removed.&nbsp; You will be informed if any data and images are
                                    removed.&nbsp;
                                </Paragraph>
                            </li>
                        </ul>
                        <Paragraph>
                            If we believe you are using our Site illegally or in a manner that violates these Terms and
                            Conditions, we reserve the right to limit, suspend or terminate your access to our Site. We
                            also reserve the right to take any legal steps necessary to prevent you from accessing our
                            Site.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">User Contributions</TextHeader>
                        <Paragraph>Users may post the following information on our Site:</Paragraph>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>Blog post comments&nbsp;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Movie poster images and supporting content&nbsp;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Advertising content</Paragraph>
                            </li>
                        </ul>
                        <Paragraph>
                            By posting movie posters, advertising and making comments publicly on our Site, you agree
                            not to act illegally or violate these Terms and Conditions.&nbsp; We reserve the right to
                            remove all comments made on our site.&nbsp;
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Accounts</TextHeader>
                        <Paragraph>
                            When you take out a subscription and create an account on our Site, you agree to the
                            following:
                        </Paragraph>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    You are solely responsible for your account and the security and privacy of your
                                    account, including passwords or sensitive information attached to that account; and
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    All personal information you provide to us through your account is up to date,
                                    accurate, and truthful and that you will update your personal information if it
                                    changes.
                                </Paragraph>
                            </li>
                        </ul>
                        <Paragraph>
                            We reserve the right to suspend or terminate your account if you are using our Site
                            illegally or if you violate these Terms and Conditions.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Sale of goods and services</TextHeader>
                        <Paragraph>
                            These Terms and Conditions govern the sale of goods and services available on our Site.
                        </Paragraph>
                        <Paragraph>The following goods are available on our Site:</Paragraph>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>Original movie posters and movie memorabilia</Paragraph>
                            </li>
                        </ul>
                        <Paragraph>
                            We are under a legal duty to display goods for supply that match the description of the
                            good(s) displayed on our Site.
                        </Paragraph>
                        <Paragraph>The following services are available on our Site:</Paragraph>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    Movie Poster Collector Subscriptions, selling of movie posters and memorabilia ; and
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Site Advertising.</Paragraph>
                            </li>
                        </ul>
                        <Paragraph>The services will be paid for in full when the services are ordered.</Paragraph>
                        <Paragraph>
                            These Terms and Conditions apply to all the goods and services that are displayed on our
                            Site at the time you access it. This includes all products listed as being out of stock. All
                            information, descriptions, or images that we provide about our goods and services are as
                            accurate as possible. However, we are not legally bound by such information, condition
                            grading, descriptions, or images as we cannot guarantee the accuracy of all goods and
                            services provided by third party Users. You agree to purchase goods and services from our
                            Site at your own risk.
                        </Paragraph>
                        <Paragraph>
                            We reserve the right to modify, reject or cancel your order whenever it becomes necessary.
                            If we cancel your order and have already processed your payment, we will give you a refund
                            equal to the amount you paid. You agree that it is your responsibility to monitor your
                            payment instrument to verify receipt of any refund.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Third Party Goods and Services</TextHeader>
                        <Paragraph>
                            Our Site offers goods and services from third parties. We cannot guarantee the quality or
                            accuracy of goods and services made available by third parties on our Site.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">user goods and services</TextHeader>
                        <Paragraph>
                            Our Site allows users to sell goods and services. We do not assume any responsibility for
                            the goods and services Users sell on our Site. We cannot guarantee the quality or accuracy
                            of any goods and services sold by users on our Site. However, if we are made aware that a
                            user is violating these Terms and Conditions, we reserve the right to suspend or prohibit
                            the user from selling goods and services on our Site.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">subscriptions</TextHeader>
                        <Paragraph>
                            Your subscription automatically renews and you will be automatically billed until we receive
                            notification that you want to cancel the subscription.
                        </Paragraph>
                        <Paragraph>
                            To cancel your subscription, please contact{" "}
                            <a href="mailto:admin@theartoffilm.co.uk">
                                <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                            </a>
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">The Art of Film Commission</TextHeader>
                        <Paragraph>
                            A 6% commission is payable on all items that are sold via our Site.&nbsp; Commission is
                            automatically deducted on completion of a sale.&nbsp; We do not take commission on postage
                            and shipping costs.&nbsp;
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Payments</TextHeader>
                        <Paragraph>We accept the following payment methods on our Site:</Paragraph>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>Credit Card;</Paragraph>
                            </li>
                            {/* <li className="list-disc">
                                <Paragraph>PayPal; and</Paragraph>
                            </li> */}
                            <li className="list-disc">
                                <Paragraph>Direct Debit.</Paragraph>
                            </li>
                        </ul>
                        <Paragraph>
                            When you provide us with your payment information, you authorise our use of and access to
                            the payment instrument you have chosen to use. By providing us with your payment
                            information, you authorise us to charge the amount due to this payment instrument.
                        </Paragraph>
                        <Paragraph>
                            If we believe your payment has violated any law or these Terms and Conditions, we reserve
                            the right to cancel or reverse your transaction.
                        </Paragraph>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">shipping and Delivery</TextHeader>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    Delivery of posters purchased on the site is managed directly between the Buyer and
                                    the Seller. &nbsp;The Art of Film does not have any involvement and does not take
                                    any responsibility for shipping arrangements.&nbsp; The Art of Film does not accept
                                    any responsibility for damage caused via shipping or any item that&nbsp; may get
                                    lost in the post.&nbsp;&nbsp;
                                </Paragraph>
                            </li>
                        </ul>
                        <Paragraph>
                            Poster Sellers are advised to ensure delivery takes place as soon as reasonably possible,
                            depending on the delivery method selected. Delivery times may vary due to distance and
                            unforseen circumstances. Please note that delivery times do not include weekends and bank
                            holidays.
                        </Paragraph>
                        <Paragraph>
                            You will be required to pay delivery charges in addition to the price for the goods you
                            purchase. The Art of Film does not take commission on delivery and shipment costs.&nbsp;
                        </Paragraph>
                        <Paragraph>
                            If you purchase goods&nbsp; for delivery to a destination outside the United Kingdom your
                            purchase may be subject to import duties and taxes applied by the destination country. You
                            are responsible for paying any such duties or taxes. Please contact your local customs
                            office for more information before making a purchase. We are not responsible for the payment
                            of any such duties or taxes and are not liable for any failure by you to pay them.
                        </Paragraph>
                        <Paragraph>
                            You are required to provide us with a complete and accurate delivery address, including the
                            name of the recipient. Our sellers are not liable for the delivery of your goods to the
                            wrong address or wrong person as a result of you providing us with inaccurate or incomplete
                            information.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">
                            Right to Cancel and Receive Reimbursement
                        </TextHeader>
                        <Paragraph>
                            If you are a customer living in the United Kingdom or the European Union you have the right
                            to cancel your contract to purchase goods and services from us within 14 days without giving
                            notice. The cancellation period:
                        </Paragraph>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    Will end 14 days from the date of purchase when you purchased a service;
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Will end 14 days from when you receive, or someone you nominate receives, the goods
                                    when you purchased good(s) in one order that are all delivered together;
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Will end 14 days from when you receive, or someone you nominate receives, the last
                                    good when you purchased goods in one order that are delivered separately; or
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Will end 14 days from when you receive, or someone you nominate receives, the first
                                    good when you purchased goods that will be regularly delivered during a defined
                                    period of time.
                                </Paragraph>
                            </li>
                        </ul>
                        <Paragraph>
                            To exercise your right to cancel you must inform us of your decision to cancel within the
                            cancellation period. To cancel, contact us by email at{" "}
                            <a href="mailto:admin@theartoffilm.co.uk">
                                <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                            </a>
                        </Paragraph>
                        <Paragraph>The right to cancel does not apply to:</Paragraph>
                        <ul className="pl-8">
                            <li className="list-disc">
                                <Paragraph>
                                    Goods or services, other than the supply of water, gas, electricity, or district
                                    heating, where the price depends upon fluctuations in the financial market that we
                                    cannot control and that may occur during the cancellation period;
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Custom or personalised goods;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>Goods that will deteriorate or expire rapidly;</Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Alcoholic beverages where the price has been agreed upon at the time of purchase,
                                    delivery of them can only take place after 30 days, and their value is dependent on
                                    fluctuations in the market that we cannot control;
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Services that the customer has requested for the purpose of carrying out urgent
                                    repairs or maintenance;
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Newspapers, magazines, or periodicals, except for subscriptions to such
                                    publications; and
                                </Paragraph>
                            </li>
                            <li className="list-disc">
                                <Paragraph>
                                    Accommodation, transport of goods, vehicle rental services, catering, or services
                                    related to leisure activities, if the contract includes a specific date or period of
                                    performance.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Right to cancel</TextHeader>
                        <Paragraph>
                            If you cancel your contract with us and goods have already been sent to you, then you must
                            return the goods to us as soon as possible after informing us of your decision to cancel.
                            You will be responsible for the cost of returning the goods. We will not be responsible for
                            any damage or loss to the goods that occurs before they are returned to us, including while
                            the goods are in transit.
                        </Paragraph>
                        <Paragraph>
                            If you cancel your contract with us, we will reimburse to you all payments we received from
                            you under the contract, including the costs of delivery, except for any supplementary
                            delivery charges resulting from your choice of a delivery type other than the least
                            expensive type of standard delivery that we offer. Please note that we are permitted by law
                            to reduce your reimbursement to reflect any reduction in the value of the goods that was
                            caused by handling other than what is necessary to establish the nature, characteristics,
                            and functioning of the goods.
                        </Paragraph>
                        <Paragraph>
                            We will provide the reimbursement without undue delay and no later than the earlier of 14
                            days after we receive back from you any goods supplied or 14 days after you provide proof
                            that you have returned the goods. If no goods were supplied, then we will provide the
                            reimbursement no later than 14 days after the day we were informed of your decision to
                            cancel.
                        </Paragraph>
                        <Paragraph>
                            If you requested the performance of services begin during the cancellation period, you are
                            required to pay us an amount which is in proportion to what has been performed until you
                            have communicated to us your decision to cancel this contract. We will reimburse to you any
                            amount you have paid above this proportionate payment.
                        </Paragraph>
                        <Paragraph>
                            We will make the reimbursement using the same form of payment as you used for the initial
                            purchase unless you have expressly agreed otherwise. You will not incur any fees because of
                            the reimbursement.
                        </Paragraph>
                        <Paragraph>
                            This right to cancel and to reimbursement is not affected by any return or refund policy we
                            may have.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">consumer protection Law</TextHeader>
                        <Paragraph>
                            Where the Sale of Goods Act 1979, the Consumer Rights Act 2015, or any other consumer
                            protection legislation in your jurisdiction applies and cannot be excluded, these Terms and
                            Conditions will not limit your legal rights and remedies under that legislation. These Terms
                            and Conditions will be read subject to the mandatory provisions of that legislation. If
                            there is a conflict between these Terms and Conditions and that legislation, the mandatory
                            provisions of the legislation will apply.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <Paragraph>&nbsp;</Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Links to Other Websites</TextHeader>
                        <Paragraph>
                            Our Site contains links to third party websites or services that we do not own or control.
                            We are not responsible for the content, policies, or practices of any third party website or
                            service linked to on our Site. It is your responsibility to read the terms and conditions
                            and privacy policies of these third party websites before using these sites.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <Paragraph>&nbsp;</Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Limitation of Liability</TextHeader>
                        <Paragraph>
                            Henry Coleman and our directors, officers, agents, employees, subsidiaries, and affiliates
                            will not be liable for any actions, claims, losses, damages, liabilities and expenses
                            including legal fees from your use of the Site.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Indeminity</TextHeader>
                        <Paragraph>
                            Except where prohibited by law, by using this Site you indemnify and hold harmless Henry
                            Coleman and our directors, officers, agents, employees, subsidiaries, and affiliates from
                            any actions, claims, losses, damages, liabilities and expenses including legal fees arising
                            out of your use of our Site or your violation of these Terms and Conditions.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Applicable Law</TextHeader>
                        <Paragraph>
                            These Terms and Conditions are governed by the laws of the Country of England.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Dispute Resolution</TextHeader>
                        <Paragraph>
                            Subject to any exceptions specified in these Terms and Conditions, if you and Henry Coleman
                            are unable to resolve any dispute through informal discussion, then you and Henry Coleman
                            agree to submit the issue first before a non-binding mediator and to an arbitrator in the
                            event that mediation fails. The decision of the arbitrator will be final and binding. Any
                            mediator or arbitrator must be a neutral party acceptable to both you and Henry Coleman. The
                            costs of any mediation or arbitration will be paid by the unsuccessful party.
                        </Paragraph>
                        <Paragraph>
                            Notwithstanding any other provision in these Terms and Conditions, you and Henry Coleman
                            agree that you both retain the right to bring an action in small claims court and to bring
                            an action for injunctive relief or intellectual property infringement.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">severability</TextHeader>
                        <Paragraph>
                            If at any time any of the provisions set forth in these Terms and Conditions are found to be
                            inconsistent or invalid under applicable laws, those provisions will be deemed void and will
                            be removed from these Terms and Conditions. All other provisions will not be affected by the
                            removal and the rest of these Terms and Conditions will still be considered valid.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">changes</TextHeader>
                        <Paragraph>
                            These Terms and Conditions may be amended from time to time in order to maintain compliance
                            with the law and to reflect any changes to the way we operate our Site and the way we expect
                            users to behave on our Site. We will notify users by email of changes to these Terms and
                            Conditions or post a notice on our Site.
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Contact Details</TextHeader>
                        <Paragraph>
                            Please contact{" "}
                            <a href="mailto:admin@theartoffilm.co.uk">
                                <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                            </a>
                            if you have any questions or concerns.& You can also contact us through the feedback form
                            available on our Site
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">Cancellations</TextHeader>
                        <Paragraph>
                            If you want to cancel your contract of sale with us you may contact{" "}
                            <a href="mailto:admin@theartoffilm.co.uk">
                                <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                            </a>
                            &nbsp;giving your notice of cancellation.&nbsp;
                        </Paragraph>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <TextHeader className="text-2xl text-accent">
                            Policy Effective From Date: 24th day of January, 2022
                        </TextHeader>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <Paragraph>
                            Contact Henry Coleman the author
                            <a href="mailto:admin@theartoffilm.co.uk">
                                <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                            </a>
                            admin@theartoffilm.co.uk
                        </Paragraph>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsScreen;
