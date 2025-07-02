# Gold Portfolio Setup Instructions

## 🔐 Password Protection

The gold portfolio page is protected with password: `vishnu0923`

To change the password, update the `CORRECT_PASSWORD` variable in:
- `components/PasswordGate.tsx`
- `lib/goldStorage.ts` (ENCRYPTION_KEY)

## 📊 Data Storage

Your data is automatically saved in encrypted format to GitHub. This provides:

- ✅ **True sync** across all your devices
- ✅ **Automatic backup** to your private GitHub repository
- ✅ **Version history** with Git
- ✅ **Zero local storage** - everything in the cloud
- ✅ **End-to-end encryption** before upload

## 🚀 Setting up GitHub (Required)

### Step 1: Create a GitHub Repository
1. Go to GitHub and create a new **private** repository
2. Name it `gold-data` (or update the name in `lib/goldStorage.ts`)
3. Make sure it's **private** for security

### Step 2: Generate Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Gold Portfolio Data"
4. Select scope: **repo** (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### Step 3: Add Token to Your App
1. Create a file called `.env.local` in your project root
2. Add this line: `NEXT_PUBLIC_GITHUB_TOKEN=your_token_here`
3. Replace `your_token_here` with your actual token
4. Restart your development server

### Step 4: Update Configuration (if needed)
In `lib/goldStorage.ts`, update these variables if you used different names:
```typescript
const GITHUB_OWNER = "your_github_username";
const GITHUB_REPO = "your_repo_name";
```

## 🔄 Data Migration

Your existing data will be automatically migrated when you first access the page after setup. The app will:

1. Look for old localStorage data
2. Encrypt it with the new system
3. Save it to GitHub automatically
4. Clean up old local data

## 🛡️ Security Features

- **Password Protection**: Page is locked behind a password
- **Data Encryption**: All data is encrypted before upload to GitHub
- **Session Memory**: Password is remembered for the browser session
- **Private Repository**: GitHub data is stored in a private repo
- **Zero Local Storage**: No data stored locally after sync

## 🎯 Usage

1. Set up GitHub repository and token (required)
2. Visit `/gold`
3. Enter password: `vishnu0923`
4. Add your gold investments
5. Data automatically syncs to GitHub
6. Access from any device with the same password

## 🔧 Troubleshooting

- **"GitHub token not configured"**: Set up the NEXT_PUBLIC_GITHUB_TOKEN environment variable
- **"Failed to connect to GitHub"**: Check your GitHub token permissions and internet connection
- **Can't access**: Make sure you're using the correct password: `vishnu0923`
- **Data not appearing**: Check your GitHub repository for the encrypted backup file
- **Repository not found**: Make sure the repository name and owner are correct in goldStorage.ts

Enjoy tracking your gold investments! 🥇 