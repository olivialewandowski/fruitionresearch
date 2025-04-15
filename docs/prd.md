# Fruition: Research Marketplace & Management System PRD

## 1. System Overview and Architecture

**Fruition** is an AI-powered research marketplace and project management platform for NYU that facilitates undergraduate research engagement. The system will be built using a modern web architecture with:

- **Frontend**: 
  - Next.js for server-side rendering and SEO.
  - React with Tailwind CSS for component-based UI.
  - Zustand for lightweight state management.

- **Authentication & Authorization**:
  - Supabase Auth for secure authentication with SSO.
  - Supabase Row-Level Security (RLS) and middleware to enforce complex permissions.

- **Backend**:
  - NestJS for a modular, scalable API layer decoupled from the database.

- **Database**:
  - Supabase Postgres with robust relational features and built-in RLS policies.

- **Infrastructure**:
  - Docker for containerization.
  - AWS ECS for deployment.
  - GitHub Actions for CI/CD automation.

---

## 2. Database Schema and Data Model

### Core Entities
- **Users**: Represents students, faculty, and administrators.
- **Organizations**: Labs, initiatives, departments, etc.
- **Projects**: Research projects within or outside organizations.
- **Positions**: Research roles students can apply to.
- **Applications**: Student submissions to positions.

### User Profiles
- **Student Profiles**: Major, graduation year, skills, interests, resume.
- **Faculty Profiles**: Department, research interests.

### Permissions and Access
- **Organization Access**: Viewer, Manager, Owner roles.
- **Project Access**: Inherited from organization access.
- **Application Forms**: Custom questions/settings for positions.

---

## 3. Authentication and Permission System

### User Roles
- **Students**: Browse/apply for positions, manage applications.
- **Faculty**: Create/manage projects, review applications.
- **Admin**: Create/manage organizations.

### Access Levels
- **Owner**: Full access.
- **Manager**: Manage roles/applications.
- **Viewer**: Read-only access.

### Permission Inheritance
- Organization-level access trickles down to projects.
- Permissions enforced via NestJS guards and Supabase RLS.

---

## 4. Core Features Implementation

### A. Connect Feature
- **Browse Interface**:
  - Scrollable list + expanded view.
  - Toggle card or scroll view.
  - Bookmarking.

- **Filtering System**:
  - Filter by type, compensation, org, dates.
  - Keyword search via vector similarity.
  - User preferences.

- **Recommendation Algorithm**:
  - Vector embedding, cosine similarity for skills/interests.
  - Personalized suggestions.
  - Sorted by relevance.

- **Application Management**:
  - Status tracking, notifications.
  - Form submissions.
  - Acceptance flow.

### B. Projects Feature
- **Project Management**:
  - Create with optional org link.
  - Role designation.
  - Invite system.

- **Permission Management**:
  - Access level controls.
  - Titles, custom roles.

- **Archiving System**:
  - Archive projects/orgs.
  - Access via profile.

### C. Positions & Applications Management
- **Position Creation**:
  - Form for details, compensation, location.
  - Customizable app forms.

- **Application Review**:
  - Sort/filter applicants.
  - Accept/reject workflow.
  - Invitation for accepted students.

- **Student Experience**:
  - Save applications.
  - Status updates.
  - Acceptance flow.

### D. Analytics Feature
- **Visualization Dashboard**:
  - Applicant grad year distribution.
  - Expandable metrics support.

---

## 5. AI Components Implementation

- **Position Recommendation Engine**:
  - Semantic vector embeddings.
  - Skill/interest weighting.
  - Relevance scoring.

- **Keyword Search Optimization**:
  - Semantic matching.
  - Title/tag/description weighting.
  - Filter integration.

- **Technical Needs**:
  - Vector calculation/storage.
  - Real-time response optimization.
  - Retraining pipeline.

---

## 6. Email Notification System

Using AWS SES to support:

- **Invitation Emails**:
  - Role/access details, action links.

- **Application Status Updates**:
  - Accept/reject messages.
  - Next steps for accepted users.

- **Position Closing Notifications**:
  - Auto-emails for deadline closures.

---

## 7. Frontend Implementation

### Navigation System
- Hierarchical nav between orgs, projects, features.
- Role-based sidebar.
- Breadcrumbs.

### Dashboard Views
- Top-level projects dashboard.
- Org-level analytics.
- Project-level team & position views.

### Connect Interface
- Tabs for Browse/Saved/Applications.
- Dual-panel browsing.
- Dynamic application forms.

### Form Components
- Custom form generator.
- Tag inputs for skills/interests.
- Rich text editor support.

---

## 8. API Architecture

### Endpoints

- **Authentication**: Register, login, profile completion.
- **User/Profile**: Manage profile, skills, preferences.
- **Organization**: CRUD, team management, analytics.
- **Projects**: CRUD, team & position management.
- **Connect/Applications**: Browse, apply, manage status.

All endpoints should:
- Validate with Zod.
- Enforce permissions at route and DB level.

---

## 9. Testing Strategy

### Unit Testing
- Jest for logic, services, controllers.
- Algorithm testing.

### Integration Testing
- API + DB interactions.
- Auth and RBAC enforcement.

### End-to-End Testing
- Playwright for full workflows.
- Application flow, Connect filtering.

---

## 10. Deployment and Infrastructure

### Docker Containerization
- Multi-stage builds.
- ENV var config.
- Separate API and frontend containers.

### CI/CD Pipeline
- GitHub Actions for tests and deploys.
- Automated DB migrations.

### AWS Infrastructure
- ECS for orchestration.
- RDS for Postgres.
- S3 for resumes/files.
- SES for emails.

### Monitoring & Logging
- Winston for logs.
- Performance and error tracking.

---

## 11. Security Considerations

### Data Protection
- Secure credential storage.
- Resume & PII protection.

### Access Control
- Strict RBAC enforcement.
- Secure invitation mechanisms.

### API Security
- Zod validation.
- CSRF protection.
- Rate limiting.

---

## 12. Performance Optimization

### Database
- Indexing on common queries.
- Efficient joins for permission checks.

### Caching
- Read-heavy route caching.
- Preference and listing caching.

### Frontend
- Code splitting/lazy loading.
- Efficient rendering.

---

## 13. Implementation Phasing

1. **Core Infrastructure**: Auth, DB, base API.
2. **User & Org Management**
3. **Projects & Positions**
4. **Connect & Applications**
5. **Analytics & AI Features**
6. **Testing, Optimization, Launch**

---

## 14. Technical Requirements

- TypeScript best practices throughout.
- Proper error handling + Zod validation.
- NestJS patterns for API maintainability.
- Custom hooks/context for React frontend.
- DB constraints and relationships.
- Tailwind-based reusable UI components.
- Accessibility compliance.
- API & component documentation.
- Standardized logging.
- AWS security groups and permissions.
