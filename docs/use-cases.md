# Use Cases

**Project:** UnioLoci  
**Version:** 1.0  
**Date:** December 12th, 2025  
**Author:** Josué Cruz

---

## Introduction

This document contains the **use cases** derived from the functional requirements defined in [`docs/srs.md`](docs/srs.md) and the MVP scope in [`docs/vision_scope.md`](docs/vision_scope.md). Use cases describe interactions between actors (users) and the system, focusing on the MVP features.

Actors:

- **User**: Includes calendar creators and members (no differentiated roles in MVP).
- **System**: The UnioLoci backend (NestJS, WebSockets, etc.).

These use cases cover the MVP only. Each includes preconditions, main flow, alternative flows, and postconditions.

Prioritization: High for core functionalities (authentication, calendars, events, real-time sync); medium for AI and notifications.

---

## 1. Authentication

### UC-1: Magic Link Login

**Primary Actor:** User  
**Preconditions:** User has a valid email address.  
**Main Flow:**

1. User enters their email in the login form.
2. System validates the email and sends a magic link via email.
3. User clicks the magic link in the email.
4. System authenticates the user and creates a JWT session.  
   **Alternative Flows:**

- If email is invalid, system displays an error message.  
  **Postconditions:** User is logged in with a valid session.

### UC-1.1: First Login Onboarding

**Primary Actor:** New User  
**Preconditions:** User has successfully authenticated for the first time.  
**Main Flow:**

1. System detects user is new.
2. System presents profile completion screen (Name).
3. User enters required information.
4. System saves profile and redirects to dashboard.  
   **Alternative Flows:** None (step is mandatory).  
   **Postconditions:** User profile is complete; user has access to features.

### UC-2: Session Expiration

**Primary Actor:** User  
**Preconditions:** User is logged in.  
**Main Flow:**

1. System monitors session inactivity or time limit.
2. When limit is reached, system expires the JWT.  
   **Alternative Flows:** None.  
   **Postconditions:** User is logged out and must re-authenticate.

---

## 2. Calendar Management

### UC-3: Create Calendar

**Primary Actor:** User (Creator)  
**Preconditions:** User is authenticated.  
**Main Flow:**

1. User accesses the calendar creation interface.
2. User enters a calendar name.
3. System validates the name and generates a unique shareable link.
4. System adds the user as a member and displays the new calendar.  
   **Alternative Flows:**

- If name is invalid (e.g., empty), system prompts for correction.  
  **Postconditions:** Calendar exists with user as member; shareable link is available.

### UC-4: Join Calendar

**Primary Actor:** User  
**Preconditions:** User has a shareable link; user is authenticated.  
**Main Flow:**

1. User clicks the shareable link.
2. System displays a confirmation dialog.
3. User confirms joining.
4. System adds user as a member and grants access to the calendar.  
   **Alternative Flows:**

- If user declines, no action is taken.  
  **Postconditions:** User is a member of the calendar.

### UC-5: View List of Calendars

**Primary Actor:** User (Member)  
**Preconditions:** User is authenticated and member of at least one calendar.  
**Main Flow:**

1. User accesses the main interface.
2. System displays a list of calendars the user is a member of, including names and members.  
   **Alternative Flows:** None.  
   **Postconditions:** User can select a calendar to view.

### UC-6: Edit Calendar Name

**Primary Actor:** User (Creator)  
**Preconditions:** User is the creator of the calendar.  
**Main Flow:**

1. User selects the calendar and chooses edit name option.
2. User enters a new name.
3. System validates and updates the name.  
   **Alternative Flows:**

- If user is not creator, system denies access.
- If name is invalid, system prompts for correction.  
  **Postconditions:** Calendar name is updated for all members.

### UC-6.1: Transfer Calendar Ownership

**Primary Actor:** User (Creator)  
**Preconditions:** User is the calendar creator; at least one other member exists.  
**Main Flow:**

1. User selects "Transfer Ownership" from calendar settings.
2. User selects a member from the list.
3. User confirms transfer in a dialog.
4. System updates calendar ownership and demotes original creator to member.  
   **Alternative Flows:**  
   - If user is not creator, access denied.  
   - If no other members exist, action cannot be performed.  
   **Postconditions:** Calendar has a new owner.

### UC-7: Leave Calendar

**Primary Actor:** User (Member)  
**Preconditions:** User is a member of the calendar.  
**Main Flow:**

1. User selects the leave option from the calendar interface.
2. System confirms the action.
3. System removes the user from the calendar.  
   **Alternative Flows:**

- If user cancels, no action is taken.  
  **Postconditions:** User no longer has access to the calendar.

---

## 3. Event Management

### UC-8: Create Event

**Primary Actor:** User  
**Preconditions:** User is a member of the calendar.  
**Main Flow:**

1. User accesses the event creation form.
2. User enters title, date, time, and duration.
3. System validates the data and creates the event.
4. System displays the event in the calendar.  
   **Alternative Flows:**

- If data is invalid (e.g., past date), system shows error and prompts correction.  
  **Postconditions:** Event is created and visible to all members.

### UC-9: Edit Event

**Primary Actor:** User  
**Preconditions:** Event exists in the calendar.  
**Main Flow:**

1. User selects an event and chooses edit.
2. User modifies fields (title, date, time, duration, description).
3. System validates and updates the event.  
   **Alternative Flows:**

- If data is invalid, system prompts correction.
- If another user starts editing the same event, system displays a small avatar indicator next to the event to show who is editing it.  
  **Postconditions:** Event is updated and synced in real-time.

### UC-10: Move Event

**Primary Actor:** User  
**Preconditions:** Event exists; monthly view is active.  
**Main Flow:**

1. User drags the event to a new date/time in the monthly grid.
2. System updates the event's date and time.  
   **Alternative Flows:** None.  
   **Postconditions:** Event is repositioned and synced.

### UC-11: Delete Event

**Primary Actor:** User  
**Preconditions:** Event exists.  
**Main Flow:**

1. User selects an event and chooses delete.
2. System prompts for confirmation.
3. User confirms; system soft-deletes the event.  
   **Alternative Flows:**

- If user cancels, no action is taken.  
  **Postconditions:** Event is removed from the calendar.

### UC-12: View Events in Monthly View

**Primary Actor:** User  
**Preconditions:** User is viewing a calendar.  
**Main Flow:**

1. User selects monthly view.
2. System displays the calendar grid with events per day.
3. User can navigate between months.  
   **Alternative Flows:** None.  
   **Postconditions:** Events are visible in the grid.

---

## 4. Real-Time Synchronization

### UC-13: View Real-Time Changes

**Primary Actor:** User (Collaborative)  
**Preconditions:** Multiple users are connected to the calendar.  
**Main Flow:**

1. A user makes a change (e.g., edits an event).
2. System broadcasts the update via WebSockets.
3. Other users see the change within <3 seconds.  
   **Alternative Flows:** None.  
   **Postconditions:** All connected users have the updated calendar.

### UC-14: Presence Indicators

**Primary Actor:** User  
**Preconditions:** Multiple users are connected.  
**Main Flow:**

1. System tracks user actions (joining, leaving, editing).
2. System displays indicators (e.g., online status) in real-time.  
   **Alternative Flows:** None.  
   **Postconditions:** Users are aware of others' presence.

---

## 5. AI Features

### UC-15: Create Event from Natural Language

**Primary Actor:** User  
**Preconditions:** User is a member; AI service is available.  
**Main Flow:**

1. User enters natural text (e.g., "Planning meeting next Friday at 3pm").
2. System uses AI to extract title, date, time, duration.
3. System creates the event with extracted data.  
   **Alternative Flows:**

- If text is ambiguous, system provides suggestions for clarification.  
  **Postconditions:** Event is created.

### UC-16: Auto-Generate Description

**Primary Actor:** User  
**Preconditions:** Event is being created.  
**Main Flow:**

1. System generates a description based on title or input text using AI.
2. System includes the description in the event.  
   **Alternative Flows:** None.  
   **Postconditions:** Event has an AI-generated description.

---

## 6. Notifications and Reminders

### UC-17: Receive Email Reminders

**Primary Actor:** User  
**Preconditions:** Event has a reminder set; email service is configured.  
**Main Flow:**

1. System checks for upcoming events.
2. At the set time (default 30 min before), system sends an email reminder.  
   **Alternative Flows:** None.  
   **Postconditions:** User receives the email.

### UC-18: Change Reminder Time

**Primary Actor:** User  
**Preconditions:** User is a member of the calendar.  
**Main Flow:**

1. User accesses reminder settings for the calendar.
2. User changes the reminder time.
3. System updates the setting.  
   **Alternative Flows:** None.  
   **Postconditions:** Reminder time is updated for the user.

---

## 7. User Management

### UC-19: View Profile

**Primary Actor:** User  
**Preconditions:** User is authenticated.  
**Main Flow:**

1. User navigates to Profile section.
2. System displays user details (Name, Email, AI Balance).  
   **Alternative Flows:** None.  
   **Postconditions:** User views their data.

### UC-20: Update Profile

**Primary Actor:** User  
**Preconditions:** User is viewing profile.  
**Main Flow:**

1. User edits allow fields (e.g., Name).
2. User saves changes.
3. System updates user record.  
   **Alternative Flows:**  
   - If validation fails, show error.  
   **Postconditions:** User profile updated.

### UC-21: Delete Account

**Primary Actor:** User  
**Preconditions:** User is authenticated.  
**Main Flow:**

1. User selects "Delete Account" option.
2. System shows warning/confirmation dialog.
3. User confirms deletion.
4. System soft-deletes user, removes from calendars, invalidates session.  
   **Alternative Flows:**  
   - If user cancels, no action taken.  
   **Postconditions:** User is logged out and account deactivated.

---

## Final Notes

- **Estimation**: Each use case can be estimated in story points during planning (e.g., 1-5 points based on complexity).
- **Testing**: Use postconditions and flows to write tests.
- **References**: Refer to [`docs/api-design.md`](docs/api-design.md) for technical details and [`docs/database-schema.md`](docs/database-schema.md) for data schemas.

**Approval:**  
Josué Cruz — Senior Full Stack Developer  
Date: December 12th, 2025
