#HookWork

HookWorks is a no-code automation platform that allows users to build custom workflows by connecting Webhooks to actions like sending Solana tokens or dispatching emails. Designed with simplicity and scalability in mind, HookWorks is perfect for orchestrating real-time automation without writing any integration code.

🚀 Features
Create Automation Flows with Webhook as a trigger and actions like:

💸 Sending Solana tokens

📧 Sending Emails

Drag-and-drop UI to build workflows

Real-time Execution with backend queues

User Authentication with secure sign-up/login

Webhook URL Generation for external services

Dashboard to track created Zaps (workflows)



🏠 Landing Page

<img width="1164" height="633" alt="Screenshot 2026-04-06 at 7 13 36 PM" src="https://github.com/user-attachments/assets/73938e5f-5dd0-4907-973c-874cf56250ce" />



🔐 Authentication

<img width="1196" height="657" alt="Screenshot 2026-04-06 at 7 13 48 PM" src="https://github.com/user-attachments/assets/09f663d5-d02e-42bb-9acd-f249bf87825c" />




➕ Create Zap (Step-by-step UI)
Trigger Selection

Action - Solana

Final Workflow Preview
<img width="1162" height="635" alt="Screenshot 2026-04-06 at 7 13 59 PM" src="https://github.com/user-attachments/assets/710d8ff9-006c-48e2-a821-7badd3f43f75" />
<img width="1200" height="602" alt="Screenshot 2026-04-06 at 7 14 11 PM" src="https://github.com/user-attachments/assets/32c303d3-8a90-4120-abb5-635779e672be" />




📊 Zap Dashboard

<img width="1194" height="604" alt="Screenshot 2026-04-06 at 7 14 21 PM" src="https://github.com/user-attachments/assets/df52637f-2696-4da6-86b1-b6e7abf288f2" />


🧠 How It Works
User signs in

Creates automation: Trigger (Webhook) → Action (Email/Solana)

Publishes Zap

Webhook URL is generated

When Webhook receives an event:

Email is dispatched (SendGrid)

Solana transaction is sent (Solana Web3)

⚙️ Tech Stack
Frontend	Backend	Blockchain	Database
Next.js, Tailwind CSS	Node.js, Express.js	Solana Web3.js	PostgreSQL

Other Technologies:

Prisma ORM

JWT Authentication

SendGrid API for emails

Kafka (event streaming, optional in backend)

🧪 Example Workflow
Trigger: Receive Webhook
Action 1: Send 0.5 SOL to wallet Gv5x...AxQ
Action 2: Email notification sent to user@example.com

📬 Contribution
Feel free to open issues or submit PRs. Please follow coding conventions and write tests for new features.








