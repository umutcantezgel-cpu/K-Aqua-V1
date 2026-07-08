const fs = require('fs');
const path = require('path');

const impressumContent = {
  title: "Imprint",
  content: `KWT GmbH
Auweg 3
35647 Waldsolms-Brandoberndorf
Tel. +49 (0)60 85 / 9868-410
Fax +49 (0)60 85 / 9868-420
info@k-aqua.de · www.k-aqua.de

Managing Director:
Philipp Nickel, Marcello Gallio

Court of Registry:
Wetzlar HRB 6732

Domicile:
Waldsolms

USt-IdNr/VAT No.:
DE 296238486

Webdesign:
www.a-mittel.de

Programming:
ArSolution LLC`
};

const datenschutzContent = {
  title: "Privacy Policy",
  sections: [
    {
      title: "1. An overview of data protection",
      content: `General
The following gives a simple overview of what happens to your personal information when you visit our website. Personal information is any data with which you could be personally identified. Detailed information on the subject of data protection can be found in our privacy policy found below.

Data collection on our website
Who is responsible for the data collection on this website?
The data collected on this website are processed by the website operator. The operator's contact details can be found in the website's required legal notice.

How do we collect your data?
Some data are collected when you provide it to us. This could, for example, be data you enter on a contact form.
Other data are collected automatically by our IT systems when you visit the website. These data are primarily technical data such as the browser and operating system you are using or when you accessed the page. These data are collected automatically as soon as you enter our website.

What do we use your data for?
Part of the data is collected to ensure the proper functioning of the website. Other data can be used to analyze how visitors use the site.

What rights do you have regarding your data?
You always have the right to request information about your stored data, its origin, its recipients, and the purpose of its collection at no charge. You also have the right to request that it be corrected, blocked, or deleted. You can contact us at any time using the address given in the legal notice if you have further questions about the issue of privacy and data protection. You may also, of course, file a complaint with the competent regulatory authorities.`
    },
    {
      title: "2. General information and mandatory information",
      content: `The operators of this website take the protection of your personal data very seriously. We treat your personal data as confidential and in accordance with the statutory data protection regulations and this privacy policy.

If you use this website, various pieces of personal data will be collected. Personal information is any data with which you could be personally identified. This privacy policy explains what information we collect and what we use it for. It also explains how and for what purpose this happens.

Please note that data transmitted via the internet (e.g. via email communication) may be subject to security breaches. Complete protection of your data from third-party access is not possible.

Notice concerning the party responsible for this website
The party responsible for processing data on this website is:

KWT GmbH
Auweg 3
35647, Waldsolms-Brandoberndorf
(0)60 85 / 9868-410
info@k-aqua.de

The responsible party is the natural or legal person who alone or jointly with others decides on the purposes and means of processing personal data (names, email addresses, etc.).

Revocation of your consent to the processing of your data
Many data processing operations are only possible with your express consent. You may revoke your consent at any time with future effect. An informal email making this request is sufficient. The data processed before we receive your request may still be legally processed

Right to file complaints with regulatory authorities
If there has been a breach of data protection legislation, the person affected may file a complaint with the competent regulatory authorities. The competent regulatory authority for matters related to data protection legislation is the data protection officer of the German state in which our company is headquartered. A list of data protection officers and their contact details can be found at the following link: https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html.

Right to data portability
You have the right to have data which we process based on your consent or in fulfillment of a contract automatically delivered to yourself or to a third party in a standard, machine-readable format. If you require the direct transfer of data to another responsible party, this will only be done to the extent technically feasible.

SSL or TLS encryption
This site uses SSL or TLS encryption for security reasons and for the protection of the transmission of confidential content, such as the inquiries you send to us as the site operator. You can recognize an encrypted connection in your browser's address line when it changes from "http://" to "https://" and the lock icon is displayed in your browser's address bar.

If SSL or TLS encryption is activated, the data you transfer to us cannot be read by third parties.

Information, blocking, deletion
As permitted by law, you have the right to be provided at any time with information free of charge about any of your personal data that is stored as well as its origin, the recipient and the purpose for which it has been processed. You also have the right to have this data corrected, blocked or deleted. You can contact us at any time using the address given in our legal notice if you have further questions on the topic of personal data.

Opposition to promotional emails
We hereby expressly prohibit the use of contact data published in the context of website legal notice requirements with regard to sending promotional and informational materials not expressly requested. The website operator reserves the right to take specific legal action if unsolicited advertising material, such as email spam, is received.`
    },
    {
      title: "3. Data protection officer",
      content: `Statutory data protection officer
We have appointed a data protection officer for our company.
SILA Consulting GmbH
Herr Roland Nießing
Landwehr 103-105
46325 Borken
Telefon: +49 2861 80847 700
E-Mail: info@sila-consulting.de`
    },
    {
      title: "4. Data collection on our website",
      content: `Cookies
Some of our web pages use cookies. Cookies do not harm your computer and do not contain any viruses. Cookies help make our website more user-friendly, efficient, and secure. Cookies are small text files that are stored on your computer and saved by your browser.

Most of the cookies we use are so-called "session cookies." They are automatically deleted after your visit. Other cookies remain in your device's memory until you delete them. These cookies make it possible to recognize your browser when you next visit the site.

You can configure your browser to inform you about the use of cookies so that you can decide on a case-by-case basis whether to accept or reject a cookie. Alternatively, your browser can be configured to automatically accept cookies under certain conditions or to always reject them, or to automatically delete cookies when closing your browser. Disabling cookies may limit the functionality of this website.

Cookies which are necessary to allow electronic communications or to provide certain functions you wish to use (such as the shopping cart) are stored pursuant to Art. 6 paragraph 1, letter f of DSGVO. The website operator has a legitimate interest in the storage of cookies to ensure an optimized service provided free of technical errors. If other cookies (such as those used to analyze your surfing behavior) are also stored, they will be treated separately in this privacy policy.

Server log files
The website provider automatically collects and stores information that your browser automatically transmits to us in "server log files". These are:

Browser type and browser version
Operating system used
Referrer URL
Host name of the accessing computer
Time of the server request
IP address
These data will not be combined with data from other sources.

The basis for data processing is Art. 6 (1) (f) DSGVO, which allows the processing of data to fulfill a contract or for measures preliminary to a contract.

Contact form
Should you send us questions via the contact form, we will collect the data entered on the form, including the contact details you provide, to answer your question and any follow-up questions. We do not share this information without your permission.

We will, therefore, process any data you enter onto the contact form only with your consent per Art. 6 (1)(a) DSGVO. You may revoke your consent at any time. An informal email making this request is sufficient. The data processed before we receive your request may still be legally processed.

We will retain the data you provide on the contact form until you request its deletion, revoke your consent for its storage, or the purpose for its storage no longer pertains (e.g. after fulfilling your request). Any mandatory statutory provisions, especially those regarding mandatory data retention periods, remain unaffected by this provision.

Registration on this website
You can register on our website in order to access additional functions offered here. The input data will only be used for the purpose of using the respective site or service for which you have registered. The mandatory information requested during registration must be provided in full. Otherwise, we will reject your registration.

To inform you about important changes such as those within the scope of our site or technical changes, we will use the email address specified during registration.

We will process the data provided during registration only based on your consent per Art. 6 (1)(a) DSGVO. You may revoke your consent at any time with future effect. An informal email making this request is sufficient. The data processed before we receive your request may still be legally processed.

We will continue to store the data collected during registration for as long as you remain registered on our website. Statutory retention periods remain unaffected.

Processing of data (customer and contract data)
We collect, process, and use personal data only insofar as it is necessary to establish, or modify legal relationships with us (master data). This is done based on Art. 6 (1) (b) DSGVO, which allows the processing of data to fulfill a contract or for measures preliminary to a contract. We collect, process and use your personal data when accessing our website (usage data) only to the extent required to enable you to access our service or to bill you for the same.

Collected customer data shall be deleted after completion of the order or termination of the business relationship. Legal retention periods remain unaffected.

Data transmitted when entering into a contract
We transmit personally identifiable data to third parties only to the extent required to fulfill the terms of your contract, for example, to companies entrusted to deliver goods to your location or banks entrusted to process your payments. Your data will not be transmitted for any other purpose unless you have given your express permission to do so. Your data will not be disclosed to third parties for advertising purposes without your express consent.

The basis for data processing is Art. 6 (1) (b) DSGVO, which allows the processing of data to fulfill a contract or for measures preliminary to a contract.

Data transferred when signing up for services and digital content
We transmit personally identifiable data to third parties only to the extent required to fulfill the terms of your contract with us, for example, to banks entrusted to process your payments.

Your data will not be transmitted for any other purpose unless you have given your express permission to do so. Your data will not be disclosed to third parties for advertising purposes without your express consent.

The basis for data processing is Art. 6 (1) (b) DSGVO, which allows the processing of data to fulfill a contract or for measures preliminary to a contract.`
    },
    {
      title: "5. Social media",
      content: `Share content via plugins (Facebook, Google+1, Twitter, etc.)
The content on our pages can be shared on other social networks like Facebook, Twitter, or Google+. This page uses the eRecht24 Safe Sharing Tool. This tool establishes direct contact between the networks and users only after users click on one of these buttons.

This tool does not automatically transfer user data to the operators of these platforms. If users are logged into one or more of the social networks, the Like, +1, and Share buttons for Facebook, Google+1, Twitter, etc. will display an information window in which the user can edit the text before it is sent.

Our users can share the content of this page on social networks without their providers creating profiles of users' surfing behavior.

Facebook plugins (Like & Share buttons)
Our website includes plugins for the social network Facebook, Facebook Inc., 1 Hacker Way, Menlo Park, California 94025, USA. The Facebook plugins can be recognized by the Facebook logo or the Like button on our site. For an overview of Facebook plugins, see https://developers.facebook.com/docs/plugins/.

When you visit our site, a direct connection between your browser and the Facebook server is established via the plugin. This enables Facebook to receive information that you have visited our site from your IP address. If you click on the Facebook "Like button" while you are logged into your Facebook account, you can link the content of our site to your Facebook profile. This allows Facebook to associate visits to our site with your user account. Please note that, as the operator of this site, we have no knowledge of the content of the data transmitted to Facebook or of how Facebook uses these data. For more information, please see Facebook's privacy policy at https://de-de.facebook.com/policy.php.

If you do not want Facebook to associate your visit to our site with your Facebook account, please log out of your Facebook account.`
    },
    {
      title: "6. Analytics and advertising",
      content: `Google Analytics
This website uses Google Analytics, a web analytics service. It is operated by Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.

Google Analytics uses so-called "cookies". These are text files that are stored on your computer and that allow an analysis of the use of the website by you. The information generated by the cookie about your use of this website is usually transmitted to a Google server in the USA and stored there.

Google Analytics cookies are stored based on Art. 6 (1) (f) DSGVO. The website operator has a legitimate interest in analyzing user behavior to optimize both its website and its advertising.

IP anonymization
We have activated the IP anonymization feature on this website. Your IP address will be shortened by Google within the European Union or other parties to the Agreement on the European Economic Area prior to transmission to the United States. Only in exceptional cases is the full IP address sent to a Google server in the US and shortened there. Google will use this information on behalf of the operator of this website to evaluate your use of the website, to compile reports on website activity, and to provide other services regarding website activity and Internet usage for the website operator. The IP address transmitted by your browser as part of Google Analytics will not be merged with any other data held by Google.

Browser plugin
You can prevent these cookies being stored by selecting the appropriate settings in your browser. However, we wish to point out that doing so may mean you will not be able to enjoy the full functionality of this website. You can also prevent the data generated by cookies about your use of the website (incl. your IP address) from being passed to Google, and the processing of these data by Google, by downloading and installing the browser plugin available at the following link: https://tools.google.com/dlpage/gaoptout?hl=en.

Objecting to the collection of data
You can prevent the collection of your data by Google Analytics by clicking on the following link. An opt-out cookie will be set to prevent your data from being collected on future visits to this site: Disable Google Analytics.
For more information about how Google Analytics handles user data, see Google's privacy policy: https://support.google.com/analytics/answer/6004245?hl=en.

Outsourced data processing
We have entered into an agreement with Google for the outsourcing of our data processing and fully implement the strict requirements of the German data protection authorities when using Google Analytics.

Demographic data collection by Google Analytics
This website uses Google Analytics' demographic features. This allows reports to be generated containing statements about the age, gender, and interests of site visitors. This data comes from interest-based advertising from Google and third-party visitor data. This collected data cannot be attributed to any specific individual person. You can disable this feature at any time by adjusting the ads settings in your Google account or you can forbid the collection of your data by Google Analytics as described in the section "Refusal of data collection".`
    },
    {
      title: "7. Newsletter",
      content: `Newsletter data
If you would like to receive our newsletter, we require a valid email address as well as information that allows us to verify that you are the owner of the specified email address and that you agree to receive this newsletter. No additional data is collected or is only collected on a voluntary basis. We only use this data to send the requested information and do not pass it on to third parties.

We will, therefore, process any data you enter onto the contact form only with your consent per Art. 6 (1) (a) DSGVO. You can revoke consent to the storage of your data and email address as well as their use for sending the newsletter at any time, e.g. through the "unsubscribe" link in the newsletter. The data processed before we receive your request may still be legally processed.

The data provided when registering for the newsletter will be used to distribute the newsletter until you cancel your subscription when said data will be deleted. Data we have stored for other purposes (e.g. email addresses for the members area) remain unaffected.`
    },
    {
      title: "8. Plugins and tools",
      content: `YouTube
Our website uses plugins from YouTube, which is operated by Google. The operator of the pages is YouTube LLC, 901 Cherry Ave., San Bruno, CA 94066, USA.

If you visit one of our pages featuring a YouTube plugin, a connection to the YouTube servers is established. Here the YouTube server is informed about which of our pages you have visited.

If you're logged in to your YouTube account, YouTube allows you to associate your browsing behavior directly with your personal profile. You can prevent this by logging out of your YouTube account.

YouTube is used to help make our website appealing. This constitutes a justified interest pursuant to Art. 6 (1) (f) DSGVO.

Further information about handling user data, can be found in the data protection declaration of YouTube under https://www.google.de/intl/de/policies/privacy.

Google Maps
This site uses the Google Maps map service via an API. It is operated by Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.

To use Google Maps, it is necessary to save your IP address. This information is generally transmitted to a Google server in the USA and stored there. The provider of this site has no influence on this data transfer.

The use of Google Maps is in the interest of making our website appealing and to facilitate the location of places specified by us on the website. This constitutes a justified interest pursuant to Art. 6 (1) (f) DSGVO.

Further information about handling user data, can be found in the data protection declaration of Google at https://www.google.de/intl/de/policies/privacy/.`
    }
  ]
};

const cookieConsentContent = {
  cookieTitle: "We use cookies",
  cookieDesc: "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
  cookieAccept: "Accept All",
  cookieDecline: "Decline Only Essential"
};

const updateFile = (lang) => {
  const p = path.join(__dirname, '..', 'messages', lang + '.json');
  let data = JSON.parse(fs.readFileSync(p, 'utf8'));
  
  data.legal = {
    impressum: impressumContent,
    datenschutz: datenschutzContent
  };
  
  if (!data.navigation) data.navigation = {};
  data.navigation.cookieTitle = cookieConsentContent.cookieTitle;
  data.navigation.cookieDesc = cookieConsentContent.cookieDesc;
  data.navigation.cookieAccept = cookieConsentContent.cookieAccept;
  data.navigation.cookieDecline = cookieConsentContent.cookieDecline;
  
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
  console.log(`Updated ${lang}.json`);
};

updateFile('de');
updateFile('en');
