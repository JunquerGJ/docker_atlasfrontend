export class AppConstants {
  public static get baseURL(): string { return "https://10.213.0.127/api" }
  public static get enviroments(): Object[] {
    return [
      "PRO",
      "PRE"
    ]
  }

  public static get clients(): Object[] {
    return [
      "ORANGE",
      "JAZZTEL",
      "NA"
    ]
  }
  
  public static get assetTypes(): Object[] {
    return [
      "WEB",
      "API",
      "APP",
      "IOT"
    ]
  }

public static get sources(): Object[]{
  return [
    { name: "AUDIT" ,value:"AUDIT"},
    { name: "NOTIFICATION",value:"NOTIFICATION"},
    { name: "RED TEAM",value:"RED_TEAM"}
  ]
}

  public static get assetVisibilityTypes(): Object[] {
    return [
      { name: "Internet", value: 0 },
      { name: "Internal", value: 1 }
    ]
  }

  public static getAuditTools() : String[] {
    return [
      "MANUAL",
      "AUTOMATIC"
    ]
  }
  public static get logValues(): String[] {
    return [
      "DONE",
      "WIP",
      "REFINING",
      "DEFINING",
      "NO",
      "NA"
    ]
  }

  public static get grcValues(): String[] {
    return [
      "NONE", "LOW", "MEDIUM", "HIGH", "CRITICAL"
    ]
  }

  public static get enviromentTypes(): Object[] {
    return [
      { name: "Premise", value: 0 },
      { name: "Cloud", value: 1 },
      { name: "Hybrid", value: 2 },
    ]
  }

  public static get methodologies(): Object[] {
    return [
      { name: "Black box", value: "BLACK_BOX" },
      { name: "Grey box", value: "GREY_BOX" },
      { name: "White box", value: "WHITE_BOX" },
    ]
  }

  public static get trackingSystems(): Object[] {
    return [
      { name: "JIRA" },
      { name: "OpenOffice" },
    ]
  }

  public static get pentestTools(): Object[] {
    return [
      { name: "Acunetix" },
      { name: "Nessus" },
      { name: "Sisifo" }
    ]
  }

  public static get vulnerabilityRisk(): Object[] {
    return [
      "INFO","LOW","MEDIUM","HIGH","CRITICAL"
    ]
  }


  public static get cweList(): Object[] {
    return [{ id: "CWE-770", name: "Allocation of Resources Without Limits or Throttling", description: `The software allocates a reusable resource or group of resources on behalf of an actor without imposing any restrictions on how many resources can be allocated, in violation of the intended security policy for that actor.` },
    { id: "CWE-129", name: "Array Index Underflow", description: `The product uses untrusted input when calculating or using an array index, but the product does not validate or incorrectly validates the index to ensure the index references a valid position within the array.` },
    { id: "CWE-288", name: "Authentication Bypass Using an Alternate Path or Channel", description: `A product requires authentication, but the product has an alternate path or channel that does not require authentication.` },
    { id: "CWE-307", name: "Brute Force", description: `The software does not implement sufficient measures to prevent multiple failed authentication attempts within in a short time frame, making it more susceptible to brute force attacks.` },
    { id: "CWE-126", name: "Buffer Over-read", description: `The software reads from a buffer using buffer access mechanisms such as indexes or pointers that reference memory locations after the targeted buffer.` },
    { id: "CWE-124", name: "Buffer Underflow", description: `The software writes to a buffer using an index or pointer that references a memory location prior to the beginning of the buffer.` },
    { id: "CWE-127", name: "Buffer Under-read", description: `The software reads from a buffer using buffer access mechanisms such as indexes or pointers that reference memory locations prior to the targeted buffer.` },
    { id: "CWE-840", name: "Business Logic Errors", description: `Weaknesses in this category identify some of the underlying problems that commonly allow attackers to manipulate the business logic of an application.` },
    { id: "CWE-120", name: "Classic Buffer Overflow", description: `The program copies an input buffer to an output buffer without verifying that the size of the input buffer is less than the size of the output buffer, leading to a buffer overflow.` },
    { id: "CWE-312", name: "Cleartext Storage of Sensitive Information", description: `The application stores sensitive information in cleartext within a resource that might be accessible to another control sphere.` },
    { id: "CWE-319", name: "Cleartext Transmission of Sensitive Information", description: `The software transmits sensitive or security-critical data in cleartext in a communication channel that can be sniffed by unauthorized actors.` },
    { id: "CWE-602", name: "Client-Side Enforcement of Server-Side Security", description: `The software is composed of a server that relies on the client to implement a mechanism that is intended to protect the server.` },
    { id: "CWE-94", name: "Code Injection", description: `The software constructs all or part of a code segment using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the syntax or behavior of the intended code segment.` },
    { id: "CWE-77", name: "Command Injection - Generic", description: `The software constructs all or part of a command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended command when it is sent to a downstream component.` },
    { id: "CWE-362", name: "Concurrent Execution using Shared Resource with Improper Synchronization ('Race Condition')", description: `The program contains a code sequence that can run concurrently with other code, and the code sequence requires temporary, exclusive access to a shared resource, but a timing window exists in which the shared resource can be modified by another code sequence that is operating concurrently.` },
    { id: "CWE-93", name: "CRLF Injection", description: `The software uses CRLF (carriage return line feeds) as a special element, e.g. to separate lines or records, but it does not neutralize or incorrectly neutralizes CRLF sequences from inputs.` },
    { id: "CWE-352", name: "Cross-Site Request Forgery (CSRF)", description: `The web application does not, or can not, sufficiently verify whether a well-formed, valid, consistent request was intentionally provided by the user who submitted the request.` },
    { id: "CWE-79", name: "Cross-site Scripting (XSS) - DOM", description: `In DOM-based XSS, the client performs the injection of XSS into the page; in the other types, the server performs the injection. DOM-based XSS generally involves server-controlled, trusted script that is sent to the client, such as Javascript that performs sanity checks on a form before the user submits it. If the server-supplied script processes user-supplied data and then injects it back into the web page (such as with dynamic HTML), then DOM-based XSS is possible.` },
    { id: "CWE-79", name: "Cross-site Scripting (XSS) - Generic", description: `The software does not neutralize or incorrectly neutralizes user-controllable input before it is placed in output that is used as a web page that is served to other users.` },
    { id: "CWE-79", name: "Cross-site Scripting (XSS) - Reflected", description: `The server reads data directly from the HTTP request and reflects it back in the HTTP response. Reflected XSS exploits occur when an attacker causes a victim to supply dangerous content to a vulnerable web application, which is then reflected back to the victim and executed by the web browser. The most common mechanism for delivering malicious content is to include it as a parameter in a URL that is posted publicly or e-mailed directly to the victim. URLs constructed in this manner constitute the core of many phishing schemes, whereby an attacker convinces a victim to visit a URL that refers to a vulnerable site. After the site reflects the attacker's content back to the victim, the content is executed by the victim's browser.` },
    { id: "CWE-79", name: "Cross-site Scripting (XSS) - Stored", description: `The application stores dangerous data in a database, message forum, visitor log, or other trusted data store. At a later time, the dangerous data is subsequently read back into the application and included in dynamic content. From an attacker's perspective, the optimal place to inject malicious content is in an area that is displayed to either many users or particularly interesting users. Interesting users typically have elevated privileges in the application or interact with sensitive data that is valuable to the attacker. If one of these users executes malicious content, the attacker may be able to perform privileged operations on behalf of the user or gain access to sensitive data belonging to the user. For example, the attacker might inject XSS into a log message, which might not be handled properly when an administrator views the logs.` },
    { id: "CWE-310", name: "Cryptographic Issues - Generic", description: `Weaknesses in this category are related to the use of cryptography.` },
    { id: "CWE-400", name: "Denial of Service", description: `The software does not properly restrict the size or amount of resources that are requested or influenced by an actor, which can be used to consume more resources than intended.` },
    { id: "CWE-502", name: "Deserialization of Untrusted Data", description: `The application deserializes untrusted data without sufficiently verifying that the resulting data will be valid.` },
    { id: "CWE-415", name: "Double Free", description: `The product calls free() twice on the same memory address, potentially leading to modification of unexpected memory locations.` },
    { id: "CWE-506", name: "Embedded Malicious Code", description: `The application contains code that appears to be malicious in nature.` },
    { id: "CWE-749", name: "Exposed Dangerous Method or Function", description: `The software provides an Applications Programming Interface (API) or similar interface for interaction with external actors, but the interface includes a dangerous method or function that is not properly restricted.` },
    { id: "CWE-642", name: "External Control of Critical State Data", description: `The software stores security-critical state information about its users, or the software itself, in a location that is accessible to unauthorized actors.` },
    { id: "CWE-610", name: "Externally Controlled Reference to a Resource in Another Sphere", description: `The product uses an externally controlled name or reference that resolves to a resource that is outside of the intended control sphere.` },
    { id: "CWE-75", name: "Failure to Sanitize Special Elements into a Different Plane (Special Element Injection)", description: `The software does not adequately filter user-controlled input for special elements with control implications.` },
    { id: "CWE-538", name: "File and Directory Information Exposure", description: `The product stores sensitive information in files or directories that are accessible to actors outside of the intended control sphere.` },
    { id: "CWE-425", name: "Forced Browsing", description: `The web application does not adequately enforce appropriate authorization on all restricted URLs, scripts, or files.` },
    { id: "CWE-122", name: "Heap Overflow", description: `A heap overflow condition is a buffer overflow, where the buffer that can be overwritten is allocated in the heap portion of memory, generally meaning that the buffer was allocated using a routine such as malloc().` },
    { id: "CWE-444", name: "HTTP Request Smuggling", description: `When malformed or abnormal HTTP requests are interpreted by one or more entities in the data flow between the user and the web server, such as a proxy or firewall, they can be interpreted inconsistently, allowing the attacker to "smuggle" a request to one device without the other device being aware of it.` },
    { id: "CWE-113", name: "HTTP Response Splitting", description: `The software receives data from an upstream component, but does not neutralize or incorrectly neutralizes CR and LF characters before the data is included in outgoing HTTP headers.` },
    { id: "CWE-284", name: "Improper Access Control - Generic", description: `The software does not restrict or incorrectly restricts access to a resource from an unauthorized actor.` },
    { id: "CWE-287", name: "Improper Authentication - Generic", description: `When an actor claims to have a given identity, the software does not prove or insufficiently proves that the claim is correct.` },
    { id: "CWE-285", name: "Improper Authorization", description: `The software does not perform or incorrectly performs an authorization check when an actor attempts to access a resource or perform an action.` },
    { id: "CWE-295", name: "Improper Certificate Validation", description: `The software does not validate, or incorrectly validates, a certificate.` },
    { id: "CWE-703", name: "Improper Check or Handling of Exceptional Conditions", description: `The software does not properly anticipate or handle exceptional conditions that rarely occur during normal operation of the software.` },
    { id: "CWE-926", name: "Improper Export of Android Application Components", description: `The Android application exports a component for use by other applications, but does not properly restrict which applications can launch the component or access the data it contains.` },
    { id: "CWE-296", name: "Improper Following of a Certificate's Chain of Trust", description: `The software does not follow, or incorrectly follows, the chain of trust for a certificate back to a trusted root certificate, resulting in incorrect trust of any resource that is associated with that certificate.` },
    { id: "CWE-409", name: "Improper Handling of Highly Compressed Data (Data Amplification)", description: `The software does not handle or incorrectly handles a compressed input with a very high compression ratio that produces a large output.` },
    { id: "CWE-280", name: "Improper Handling of Insufficient Permissions or Privileges", description: `The application does not handle or incorrectly handles when it has insufficient privileges to access resources or functionality as specified by their permissions. This may cause it to follow unexpected code paths that may leave the application in an invalid state.` },
    { id: "CWE-177", name: "Improper Handling of URL Encoding (Hex Encoding)", description: `The software does not properly handle when all or part of an input has been URL encoded.` },
    { id: "CWE-20", name: "Improper Input Validation", description: `The product does not validate or incorrectly validates input that can affect the control flow or data flow of a program.` },
    { id: "CWE-150", name: "Improper Neutralization of Escape, Meta, or Control Sequences", description: `The software receives input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could be interpreted as escape, meta, or control character sequences when they are sent to a downstream component.` },
    { id: "CWE-644", name: "Improper Neutralization of HTTP Headers for Scripting Syntax", description: `The application does not neutralize or incorrectly neutralizes web scripting syntax in HTTP headers that can be used by web browser components that can process raw headers, such as Flash.` },
    { id: "CWE-80", name: "Improper Neutralization of Script-Related HTML Tags in a Web Page (Basic XSS)", description: `The software receives input from an upstream component, but it does not neutralize or incorrectly neutralizes special characters such as "<", ">", and "&" that could be interpreted as web-scripting elements when they are sent to a downstream component that processes web pages.` },
    { id: "CWE-170", name: "Improper Null Termination", description: `The software does not terminate or incorrectly terminates a string or array with a null character or equivalent terminator.` },
    { id: "CWE-269", name: "Improper Privilege Management", description: `The software does not properly assign, modify, track, or check privileges for an actor, creating an unintended sphere of control for that actor.` },
    { id: "CWE-326", name: "Inadequate Encryption Strength", description: `The software stores or transmits sensitive data using an encryption scheme that is theoretically sound, but is not strong enough for the level of protection required.` },
    { id: "CWE-184", name: "Incomplete Blacklist", description: `An application uses a "blacklist" of prohibited values, but the blacklist is incomplete.` },
    { id: "CWE-863", name: "Incorrect Authorization", description: `The software performs an authorization check when an actor attempts to access a resource or perform an action, but it does not correctly perform the check. This allows attackers to bypass intended access restrictions.` },
    { id: "CWE-131", name: "Incorrect Calculation of Buffer Size", description: `The software does not correctly calculate the size to be used when allocating a buffer, which could lead to a buffer overflow.` },
    { id: "CWE-697", name: "Incorrect Comparison", description: `The software compares two entities in a security-relevant context, but the comparison is incorrect, which may lead to resultant weaknesses.` },
    { id: "CWE-200", name: "Information Disclosure", description: `An information disclosure is the intentional or unintentional disclosure of information to an actor that is not explicitly authorized to have access to that information.` },
    { id: "CWE-209", name: "Information Exposure Through an Error Message", description: `The software generates an error message that includes sensitive information about its environment, users, or associated data.` },
    { id: "CWE-215", name: "Information Exposure Through Debug Information", description: `The application contains debugging code that can expose sensitive information to untrusted parties.` },
    { id: "CWE-548", name: "Information Exposure Through Directory Listing", description: `A directory listing is inappropriately exposed, yielding potentially sensitive information to attackers.` },
    { id: "CWE-203", name: "Information Exposure Through Discrepancy", description: `The product behaves differently or sends different responses in a way that exposes security-relevant information about the state of the product, such as whether a particular operation was successful or not.` },
    { id: "CWE-201", name: "Information Exposure Through Sent Data", description: `The accidental exposure of sensitive information through sent data refers to the transmission of data which are either sensitive in and of itself or useful in the further exploitation of the system through standard data channels.` },
    { id: "CWE-208", name: "Information Exposure Through Timing Discrepancy", description: `Two separate operations in a product require different amounts of time to complete, in a way that is observable to an actor and reveals security-relevant information about the state of the product, such as whether a particular operation was successful or not.` },
    { id: "CWE-639", name: "Insecure Direct Object Reference (IDOR)", description: `The system's authorization functionality does not prevent one user from gaining access to another user's data or record by modifying the key value identifying the data.` },
    { id: "CWE-922", name: "Insecure Storage of Sensitive Information", description: `The software stores sensitive information without properly limiting read or write access by unauthorized actors.` },
    { id: "CWE-377", name: "Insecure Temporary File", description: `Creating and using insecure temporary files can leave application and system data vulnerable to attack.` },
    { id: "CWE-522", name: "Insufficiently Protected Credentials", description: `This weakness occurs when the application transmits or stores authentication credentials and uses an insecure method that is susceptible to unauthorized interception and/or retrieval.` },
    { id: "CWE-613", name: "Insufficient Session Expiration", description: `According to WASC, "Insufficient Session Expiration is when a web site permits an attacker to reuse old session credentials or session IDs for authorization."` },
    { id: "CWE-190", name: "Integer Overflow", description: `The software performs a calculation that can produce an integer overflow or wraparound, when the logic assumes that the resulting value will always be larger than the original value. This can introduce other weaknesses when the calculation is used for resource management or execution control.` },
    { id: "CWE-191", name: "Integer Underflow", description: `The product subtracts one value from another, such that the result is less than the minimum allowable integer value, which produces a value that is not equal to the correct result.` },
    { id: "CWE-322", name: "Key Exchange without Entity Authentication", description: `The software performs a key exchange with an actor without verifying the identity of that actor.` },
    { id: "CWE-90", name: "LDAP Injection", description: `The software constructs all or part of an LDAP query using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended LDAP query when it is sent to a downstream component.` },
    { id: "CWE-489", name: "Leftover Debug Code (Backdoor)", description: `The application was deployed with active debugging code that can create unintended entry points.` },
    { id: "capec-549", name: "Malware", description: `An adversary installs and executes malicious code on the target system in an effort to achieve a negative technical impact.` },
    { id: "CWE-300", name: "Man-in-the-Middle", description: `The product does not adequately verify the identity of actors at both ends of a communication channel, or does not adequately ensure the integrity of the channel, in a way that allows the channel to be accessed or influenced by an actor that is not an endpoint.` },
    { id: "CWE-119", name: "Memory Corruption - Generic", description: `The software performs operations on a memory buffer, but it can read from or write to a memory location that is outside of the intended boundary of the buffer.` },
    { id: "CWE-311", name: "Missing Encryption of Sensitive Data", description: `The software does not encrypt sensitive or critical information before storage or transmission.` },
    { id: "CWE-325", name: "Missing Required Cryptographic Step", description: `The software does not implement a required step in a cryptographic algorithm, resulting in weaker encryption than advertised by that algorithm.` },
    { id: "CWE-471", name: "Modification of Assumed-Immutable Data (MAID)", description: `The software does not properly protect an assumed-immutable element from being modified by an attacker.` },
    { id: "CWE-476", name: "NULL Pointer Dereference", description: `A NULL pointer dereference occurs when the application dereferences a pointer that it expects to be valid, but is NULL, typically causing a crash or exit.` },
    { id: "CWE-193", name: "Off-by-one Error", description: `A product calculates or uses an incorrect maximum or minimum value that is 1 more, or 1 less, than the correct value.` },
    { id: "CWE-601", name: "Open Redirect", description: `A web application accepts a user-controlled input that specifies a link to an external site, and uses that link in a Redirect. This simplifies phishing attacks.` },
    { id: "CWE-78", name: "OS Command Injection", description: `The software constructs all or part of an OS command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended OS command when it is sent to a downstream component.` },
    { id: "CWE-125", name: "Out-of-bounds Read", description: `The software reads data past the end, or before the beginning, of the intended buffer.` },
    { id: "CWE-260", name: "Password in Configuration File", description: `The software stores a password in a configuration file that might be accessible to actors who do not know the password.` },
    { id: "CWE-22", name: "Path Traversal", description: `The software uses external input to construct a pathname that is intended to identify a file or directory that is located underneath a restricted parent directory, but the software does not properly neutralize special elements within the pathname that can cause the pathname to resolve to a location that is outside of the restricted directory.` },
    { id: "CWE-35", name: "Path Traversal: '.../...//'", description: `The software uses external input to construct a pathname that should be within a restricted directory, but it does not properly neutralize '.../...//' (doubled triple dot slash) sequences that can resolve to a location that is outside of that directory.` },
    { id: "capec-98", name: "Phishing", description: `Phishing is a social engineering technique where an attacker masquerades as a legitimate entity with which the victim might do business in order to prompt the user to reveal some confidential information (very frequently authentication credentials) that can later be used by an attacker. Phishing is essentially a form of information gathering or "fishing" for information.` },
    { id: "CWE-256", name: "Plaintext Storage of a Password", description: `Storing a password in plaintext may result in a system compromise.` },
    { id: "CWE-359", name: "Privacy Violation", description: `The software does not properly prevent private data (such as credit card numbers) from being accessed by actors who either (1) are not explicitly authorized to access the data or (2) do not have the implicit consent of the people to which the data is related.` },
    { id: "capec-233", name: "Privilege Escalation", description: `An adversary exploits a weakness enabling them to elevate their privilege and perform an action that they are not supposed to be authorized to perform.` },
    { id: "CWE-23", name: "Relative Path Traversal", description: `The software uses external input to construct a pathname that should be within a restricted directory, but it does not properly neutralize sequences such as ".." that can resolve to a location that is outside of that directory.` },
    { id: "CWE-784", name: "Reliance on Cookies without Validation and Integrity Checking in a Security Decision", description: `The application uses a protection mechanism that relies on the existence or values of a cookie, but it does not properly ensure that the cookie is valid for the associated user.` },
    { id: "CWE-350", name: "Reliance on Reverse DNS Resolution for a Security-Critical Action", description: `The software performs reverse DNS resolution on an IP address to obtain the hostname and make a security decision, but it does not properly ensure that the IP address is truly associated with the hostname.` },
    { id: "CWE-807", name: "Reliance on Untrusted Inputs in a Security Decision", description: `The application uses a protection mechanism that relies on the existence or values of an input, but the input can be modified by an untrusted actor in a way that bypasses the protection mechanism.` },
    { id: "CWE-98", name: "Remote File Inclusion", description: `The PHP application receives input from an upstream component, but it does not restrict or incorrectly restricts the input before its usage in "require," "include," or similar functions.` },
    { id: "CWE-509", name: "Replicating Malicious Code (Virus or Worm)", description: `Replicating malicious code, including viruses and worms, will attempt to attack other systems once it has successfully compromised the target system or software.` },
    { id: "CWE-99", name: "Resource Injection", description: `The software receives input from an upstream component, but it does not restrict or incorrectly restricts the input before it is used as an identifier for a resource that may be outside the intended sphere of control.` },
    { id: "CWE-323", name: "Reusing a Nonce, Key Pair in Encryption", description: `Nonces should be used for the present occasion and only once.` },
    { id: "CWE-328", name: "Reversible One-Way Hash", description: `The product uses a hashing algorithm that produces a hash value that can be used to determine the original input, or to find an input that can produce the same hash, more efficiently than brute force techniques.` },
    { id: "CWE-656", name: "Security Through Obscurity", description: `The software uses a protection mechanism whose strength depends heavily on its obscurity, such that knowledge of its algorithms or key data is sufficient to defeat the mechanism.` },
    { id: "CWE-918", name: "Server-Side Request Forgery (SSRF)", description: `The web server receives a URL or similar request from an upstream component and retrieves the contents of this URL, but it does not sufficiently ensure that the request is being sent to the expected destination.` },
    { id: "CWE-384", name: "Session Fixation", description: `Authenticating a user, or otherwise establishing a new user session, without invalidating any existing session identifier gives an attacker the opportunity to steal authenticated sessions.` },
    { id: "CWE-89", name: "SQL Injection", description: `The software constructs all or part of an SQL command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended SQL command when it is sent to a downstream component.` },
    { id: "CWE-121", name: "Stack Overflow", description: `A stack-based buffer overflow condition is a condition where the buffer being overwritten is allocated on the stack (i.e., is a local variable or, rarely, a parameter to a function).` },
    { id: "CWE-257", name: "Storing Passwords in a Recoverable Format", description: `The storage of passwords in a recoverable format makes them subject to password reuse attacks by malicious users. In fact, it should be noted that recoverable encrypted passwords provide no significant benefit over plaintext passwords since they are subject not only to reuse by malicious attackers but also by malicious insiders. If a system administrator can recover a password directly, or use a brute force search on the available information, the administrator can use the password on other accounts.` },
    { id: "CWE-367", name: "Time-of-check Time-of-use (TOCTOU) Race Condition", description: `The software checks the state of a resource before using that resource, but the resource's state can change between the check and the use in a way that invalidates the results of the check. This can cause the software to perform invalid actions when the resource is in an unexpected state.` },
    { id: "CWE-360", name: "Trust of System Event Data", description: `Security based on event locations are insecure and can be spoofed.` },
    { id: "CWE-843", name: "Type Confusion", description: `The program allocates or initializes a resource such as a pointer, object, or variable using one type, but it later accesses that resource using a type that is incompatible with the original type.` },
    { id: "capec-103", name: "UI Redressing (Clickjacking)", description: `In a clickjacking attack the victim is tricked into unknowingly initiating some action in one system while interacting with the UI from seemingly completely different system.` },
    { id: "CWE-391", name: "Unchecked Error Condition", description: `Ignoring exceptions and other error conditions may allow an attacker to induce unexpected behavior unnoticed.` },
    { id: "CWE-674", name: "Uncontrolled Recursion", description: `The product does not properly control the amount of recursion that takes place, which consumes excessive resources, such as allocated memory or the program stack.` },
    { id: "CWE-523", name: "Unprotected Transport of Credentials", description: `Login pages not using adequate measures to protect the user name and password while they are in transit from the client to the server.` },
    { id: "CWE-426", name: "Untrusted Search Path", description: `The application searches for critical resources using an externally-supplied search path that can point to resources that are not under the application's direct control.` },
    { id: "CWE-620", name: "Unverified Password Change", description: `When setting a new password for a user, the product does not require knowledge of the original password, or using another form of authentication.` },
    { id: "CWE-416", name: "Use After Free", description: `Referencing memory after it has been freed can cause a program to crash, use unexpected values, or execute code.` },
    { id: "CWE-327", name: "Use of a Broken or Risky Cryptographic Algorithm", description: `The use of a broken or risky cryptographic algorithm is an unnecessary risk that may result in the exposure of sensitive information.` },
    { id: "CWE-324", name: "Use of a Key Past its Expiration Date", description: `The product uses a cryptographic key or password past its expiration date, which diminishes its safety significantly by increasing the timing window for cracking attacks against that key.` },
    { id: "CWE-338", name: "Use of Cryptographically Weak Pseudo-Random Number Generator (PRNG)", description: `The product uses a Pseudo-Random Number Generator (PRNG) in a security context, but the PRNG is not cryptographically strong.` },
    { id: "CWE-134", name: "Use of Externally-Controlled Format String", description: `The software uses a function that accepts a format string as an argument, but the format string originates from an external source.` },
    { id: "CWE-798", name: "Use of Hard-coded Credentials", description: `The software contains hard-coded credentials, such as a password or cryptographic key, which it uses for its own inbound authentication, outbound communication to external components, or encryption of internal data.` },
    { id: "CWE-321", name: "Use of Hard-coded Cryptographic Key", description: `The use of a hard-coded cryptographic key significantly increases the possibility that encrypted data may be recovered.` },
    { id: "CWE-259", name: "Use of Hard-coded Password", description: `The software contains a hard-coded password, which it uses for its own inbound authentication or for outbound communication to external components.` },
    { id: "CWE-242", name: "Use of Inherently Dangerous Function", description: `The program calls a function that can never be guaranteed to work safely.` },
    { id: "CWE-330", name: "Use of Insufficiently Random Values", description: `The software may use insufficiently random numbers or values in a security context that depends on unpredictable numbers.` },
    { id: "CWE-451", name: "User Interface (UI) Misrepresentation of Critical Information", description: `The user interface (UI) does not properly represent critical information to the user, allowing the information - or its source - to be obscured or spoofed. This is often a component in phishing attacks.` },
    { id: "CWE-657", name: "Violation of Secure Design Principles", description: `The product violates well-established principles for secure design.` },
    { id: "CWE-261", name: "Weak Cryptography for Passwords", description: `Obscuring a password with a trivial encoding does not protect the password.` },
    { id: "CWE-640", name: "Weak Password Recovery Mechanism for Forgotten Password", description: `The software contains a mechanism for users to recover or change their passwords without knowing the original password, but the mechanism is weak.` },
    { id: "CWE-128", name: "Wrap-around Error", description: `Wrap around errors occur whenever a value is incremented past the maximum value for its type and therefore "wraps around" to a very small, negative, or undefined value.` },
    { id: "CWE-123", name: "Write-what-where Condition", description: `Any condition where the attacker has the ability to write an arbitrary value to an arbitrary location, often as the result of a buffer overflow.` },
    { id: "CWE-776", name: "XML Entity Expansion", description: `The software uses XML documents and allows their structure to be defined with a Document Type Definition (DTD), but it does not properly control the number of recursive definitions of entities.` },
    { id: "CWE-611", name: "XML External Entities (XXE)", description: `The software processes an XML document that can contain XML entities with URIs that resolve to documents outside of the intended sphere of control, causing the product to embed incorrect documents into its output.` },
    { id: "CWE-91", name: "XML Injection", description: `The software does not properly neutralize special elements that are used in XML, allowing attackers to modify the syntax, content, or commands of the XML before it is processed by an end system.` },
    { id: "CAPEC-209", name: "XSS Using MIME Type Mismatch", description: `An adversary creates a file with scripting content but where the specified MIME type of the file is such that scripting is not expected. The adversary tricks the victim into accessing a URL that responds with the script file. Some browsers will detect that the specified MIME type of the file does not match the actual type of its content and will automatically switch to using an interpreter for the real content type. If the browser does not invoke script filters before doing this, the adversary's script may run on the target unsanitized, possibly revealing the victim's cookies or executing arbitrary script in their browser.` },
    ]
  }
  public static get vulnerabilityStatus(): Object[] {
    return [
      { name: "ANALYSIS", value: "ANALYSIS" },
      { name: "OPEN", value: "OPEN" },
      { name: "CLOSED", value: "SOLVED" },
      { name: "FALSE POSITIVE", value: "FALSE_POSITIVE" },
      { name: "ON REVISION", value: "ON_REVISION" },
      { name: "ASSUMED", value: "ASSUMED" },
      { name: "MITIGATED", value: "MITIGATED" }
    ]
  }

  public static get vulnerabilityType(): Object[] {
    return [
      "Application",
      "Service"
    ]
  }

  public static get statusTypes(): Object[] {
    return [
      { name: "Production", value: "ON_PRODUCTION" },
      { name: "On development", value: "ON_DEVELOPMENT" },
      { name: "To be decomissioned", value: "TO_BE_DECOMISSIONED" },
      { name: "Decomissioned", value: "DECOMISSIONED" }
    ]
  }
}
