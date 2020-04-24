## What is the purpose of using _sessions_?
Sessions are used to keep track of authenticated users by storing their session on the server and providing the client with a cookie to access their session after they have logged in. The client sends a cookie with every authenticated request to access protected resources instead of having to provide a username and password.

## What does bcrypt do to help us store passwords in a secure manner.
`bcrypt` allows us to hash passwords so that the original password is never saved, in order to prevent hackers from obtaining the original password. Cryptographic hashing is a one-way operation, meaning that the input to the hashing function cannot be determined from the output, so the original password isn't compromised in the event of a security breach where hackers obtain the password hash. `bcrypt` also allows us to check the hash against a plaintext password provided by the client, to verify that the password matches the one used to make the hash.
  

## What does bcrypt do to slow down attackers?
Hashing passwords with `bcrypt` is intentionally slow, requiring many rounds of hashing so that any attempt to guess the password through a brute-force attack is impractical.
  

## What are the three parts of the JSON Web Token?
The three parts of a JSON web token are:

1. Header
The header contains information about the cryptographic algorithm used to sign the token.

2. Payload
The payload contains a set of claims, for example, the time the token was issued.

3. Signature
The signature is derived from the header and payload, along with a secret stored on the server.
