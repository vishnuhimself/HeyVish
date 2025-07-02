export class SessionManager {
  private static readonly SESSION_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  private static readonly ACCESS_KEY = "goldPortfolioAccess";
  private static readonly LOGIN_TIME_KEY = "goldPortfolioLoginTime";
  private static readonly ACTIVITY_KEY = "goldPortfolioLastActivity";

  // Check if user is authenticated and session is valid
  static isAuthenticated(): boolean {
    const hasAccess = sessionStorage.getItem(this.ACCESS_KEY);
    const loginTime = sessionStorage.getItem(this.LOGIN_TIME_KEY);
    const lastActivity = sessionStorage.getItem(this.ACTIVITY_KEY);

    if (!hasAccess || !loginTime) {
      return false;
    }

    const now = Date.now();
    const loginTimestamp = parseInt(loginTime);
    const lastActivityTimestamp = lastActivity ? parseInt(lastActivity) : loginTimestamp;

    // Check if 5 minutes have passed since last activity
    if (now - lastActivityTimestamp > this.SESSION_DURATION) {
      this.clearSession();
      return false;
    }

    // Update last activity time
    this.updateActivity();
    return true;
  }

  // Update last activity timestamp
  static updateActivity(): void {
    sessionStorage.setItem(this.ACTIVITY_KEY, Date.now().toString());
  }

  // Clear session data
  static clearSession(): void {
    sessionStorage.removeItem(this.ACCESS_KEY);
    sessionStorage.removeItem(this.LOGIN_TIME_KEY);
    sessionStorage.removeItem(this.ACTIVITY_KEY);
  }

  // Set up automatic logout timer
  static setupAutoLogout(onLogout: () => void): () => void {
    const checkInterval = setInterval(() => {
      if (!this.isAuthenticated()) {
        onLogout();
        clearInterval(checkInterval);
      }
    }, 30000); // Check every 30 seconds

    // Return cleanup function
    return () => clearInterval(checkInterval);
  }

  // Get remaining session time in minutes
  static getRemainingTime(): number {
    const lastActivity = sessionStorage.getItem(this.ACTIVITY_KEY);
    const loginTime = sessionStorage.getItem(this.LOGIN_TIME_KEY);
    
    if (!lastActivity && !loginTime) return 0;
    
    const lastActivityTimestamp = lastActivity ? parseInt(lastActivity) : parseInt(loginTime!);
    const elapsed = Date.now() - lastActivityTimestamp;
    const remaining = this.SESSION_DURATION - elapsed;
    
    return Math.max(0, Math.ceil(remaining / 60000)); // Return minutes
  }

  // Get remaining session time in seconds
  static getRemainingSeconds(): number {
    const lastActivity = sessionStorage.getItem(this.ACTIVITY_KEY);
    const loginTime = sessionStorage.getItem(this.LOGIN_TIME_KEY);
    
    if (!lastActivity && !loginTime) return 0;
    
    const lastActivityTimestamp = lastActivity ? parseInt(lastActivity) : parseInt(loginTime!);
    const elapsed = Date.now() - lastActivityTimestamp;
    const remaining = this.SESSION_DURATION - elapsed;
    
    return Math.max(0, Math.ceil(remaining / 1000)); // Return seconds
  }
} 