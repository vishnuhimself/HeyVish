import CryptoJS from 'crypto-js';

export interface GoldEntry {
  id: string;
  date: string;
  pricePerGram: number;
  extraChargesPerGram: number;
  effectivePricePerGram: number;
  totalGrams: number;
  totalInvestment: number;
  notes?: string;
}

export interface PriceHistoryEntry {
  date: string; // YYYY-MM-DD format
  price: number;
  timestamp: string; // ISO string
}

export interface GoldData {
  entries: GoldEntry[];
  currentGoldPrice: number;
  lastUpdated: string;
  priceHistory?: PriceHistoryEntry[];
}

const ENCRYPTION_KEY = "vishnu0923"; // Same as password for simplicity
const GITHUB_DATA_KEY = "gold-portfolio-data.json";

// GitHub configuration - these will be environment variables
const GITHUB_OWNER = "vishnuhimself"; // Replace with your GitHub username if different
const GITHUB_REPO = "gold-data"; // Repository name for storing data
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // GitHub personal access token

export class GoldStorage {
  private static encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  }

  private static decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Local storage methods (only for migration)
  static loadFromLocal(): GoldData | null {
    try {
      const encrypted = localStorage.getItem("goldPortfolioData");
      if (!encrypted) return null;
      
      const decrypted = this.decrypt(encrypted);
      const data = JSON.parse(decrypted);
      
      // Clean up after loading for migration
      localStorage.removeItem("goldPortfolioData");
      
      return data;
    } catch (error) {
      console.error("Error loading from local storage:", error);
      return null;
    }
  }

  // GitHub storage methods
  static async saveToGitHub(data: GoldData): Promise<boolean> {
    if (!GITHUB_TOKEN) {
      throw new Error("GitHub token not configured. Please set up NEXT_PUBLIC_GITHUB_TOKEN in your environment variables.");
    }

    try {
      const encrypted = this.encrypt(JSON.stringify(data));
      
      // First, try to get the file to check if it exists
      let sha: string | undefined;
      try {
        const getResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_DATA_KEY}`,
          {
            headers: {
              'Authorization': `token ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );
        
        if (getResponse.ok) {
          const fileData = await getResponse.json();
          sha = fileData.sha;
        }
      } catch {
        // File doesn't exist, which is fine for creation
      }

      // Create or update the file
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_DATA_KEY}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Update gold portfolio data - ${new Date().toISOString()}`,
            content: btoa(encrypted), // Base64 encode the encrypted data
            sha: sha, // Include SHA if updating existing file
          }),
        }
      );

      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        console.error("Failed to save to GitHub:", errorText);
        throw new Error(`Failed to save to GitHub: ${errorText}`);
      }
    } catch (error) {
      console.error("Error saving to GitHub:", error);
      throw error;
    }
  }

  static async loadFromGitHub(): Promise<GoldData | null> {
    if (!GITHUB_TOKEN) {
      throw new Error("GitHub token not configured. Please set up NEXT_PUBLIC_GITHUB_TOKEN in your environment variables.");
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_DATA_KEY}`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (response.ok) {
        const fileData = await response.json();
        const encryptedData = atob(fileData.content); // Base64 decode
        const decrypted = this.decrypt(encryptedData);
        const data = JSON.parse(decrypted);
        return data;
      } else if (response.status === 404) {
        // File doesn't exist in GitHub yet
        return null;
      } else {
        const errorText = await response.text();
        console.error("Failed to load from GitHub:", errorText);
        throw new Error(`Failed to load from GitHub: ${errorText}`);
      }
    } catch (error) {
      console.error("Error loading from GitHub:", error);
      throw error;
    }
  }

  // Migration method to move localStorage data to new encrypted format
  static migrateLegacyData(): GoldData | null {
    try {
      // Try to load old unencrypted data
      const oldEntries = localStorage.getItem("goldEntries");
      const oldPrice = localStorage.getItem("currentGoldPrice");
      
      if (oldEntries || oldPrice) {
        const data: GoldData = {
          entries: oldEntries ? JSON.parse(oldEntries) : [],
          currentGoldPrice: oldPrice ? parseFloat(oldPrice) : 6500,
          lastUpdated: new Date().toISOString(),
        };
        
        // Return the data for migration (will be saved to GitHub by caller)
        
        // Clean up old data
        localStorage.removeItem("goldEntries");
        localStorage.removeItem("currentGoldPrice");
        
        return data;
      }
    } catch (error) {
      console.error("Error migrating legacy data:", error);
    }
    
    return null;
  }
} 