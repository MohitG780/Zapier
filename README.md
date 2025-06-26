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

<img width="1465" alt="Screenshot 2025-06-26 at 3 49 27 PM" src="https://github.com/user-attachments/assets/5a932cb4-9688-423e-850e-5082686a2eac" />


🔐 Authentication

<img width="1462" alt="Screenshot 2025-06-26 at 3 49 39 PM" src="https://github.com/user-attachments/assets/780836d2-7f02-4a60-a015-d00f3c6dd4b0" />



➕ Create Zap (Step-by-step UI)
Trigger Selection

Action - Solana

Final Workflow Preview





<img width="1455" alt="Screenshot 2025-06-26 at 3 50 51 PM" src="https://github.com/user-attachments/assets/ace40566-49c8-4879-8257-2caaf2af1834" />

<img width="1470" alt="Screenshot 2025-06-26 at 3 51 01 PM" src="https://github.com/user-attachments/assets/b2883a2f-e5fd-4d1d-a593-636d36e054f5" />



📊 Zap Dashboard

<img width="1470" alt="Screenshot 2025-06-26 at 3 51 22 PM" src="https://github.com/user-attachments/assets/7846cf33-2c82-4df2-89cc-b859e5fe90da" />

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








