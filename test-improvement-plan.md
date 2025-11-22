# Test Improvement Plan - File by File

## Summary Dashboard

| Metric | Value |
|--------|-------|
| Total Files to Test | 170 |
| Already Tested | 8 |
| Remaining | 162 |
| Total Estimated Hours | ~450 hours |
| Target Coverage | 60% |
| Sprints Required | 8 |

## Priority Legend

| Priority | Description | Count |
|----------|-------------|-------|
| P0-Critical | Must have for 60% coverage | 15 |
| P1-High | Core functionality | 35 |
| P2-Medium | Important features | 85 |
| P3-Low | Nice to have | 35 |

---

## Sprint Breakdown

### Sprint 1: Foundation (Services & Helpers)
**Goal:** Build test foundation with shared services and helpers
**Estimated Hours:** 45 hours
**Coverage Target:** 25%

| ID | File | Module | Est. Hours |
|----|------|--------|------------|
| 1 | userService.js | User Management | 4 |
| 2 | permissionService.js | Permissions | 4 |
| 3 | notificationService.js | Communication | 3 |
| 4 | applicationsService.js | Applications | 3 |
| 10 | dashboardhelper.js | Reporting | 3 |
| 11 | taskHelper.js | Tasks | 3 |
| 12 | userHelper.js | User Management | 3 |
| 20 | permissions.js (expand) | Permissions | 2 |
| 21 | errorHandling.js | Core | 2 |

**Sprint 1 Total:** 27 hours, 9 files

---

### Sprint 2: Core Controllers Part 1 (User, Permissions, Tasks, Time)
**Goal:** Test critical user-facing controllers
**Estimated Hours:** 55 hours
**Coverage Target:** 35%

| ID | File | Module | Est. Hours |
|----|------|--------|------------|
| 5-9 | Automation Services (5 files) | Automation | 10 |
| 13-15 | Remaining Helpers (3 files) | Various | 6 |
| 25 | userProfileController.js | User Management | 6 |
| 26 | logincontroller.js | User Management | 4 |
| 27 | registrationController.js | User Management | 4 |
| 28 | forgotPwdcontroller.js | User Management | 3 |
| 34 | permissionController.js | Permissions | 5 |
| 35 | rolesController.js | Permissions | 4 |
| 36 | rolePresetsController.js | Permissions | 3 |
| 38 | taskController.js | Tasks | 6 |
| 44 | timeEntryController.js | Time Tracking | 5 |

**Sprint 2 Total:** 56 hours, 15 files

---

### Sprint 3: Core Controllers Part 2 (Projects, Teams, Routes)
**Goal:** Complete core controller coverage and start route testing
**Estimated Hours:** 60 hours
**Coverage Target:** 45%

| ID | File | Module | Est. Hours |
|----|------|--------|------------|
| 29-33 | User Controllers (5 files) | User Management | 13 |
| 37 | permissionChangeLogsController.js | Permissions | 2 |
| 39-43 | Task Controllers (5 files) | Tasks | 14 |
| 45-47 | Time Tracking (3 files) | Time Tracking | 8 |
| 48 | projectController.js | Projects | 5 |
| 49-50 | Project Controllers (2 files) | Projects | 5 |
| 52 | teamController.js | Team | 5 |
| 53-54 | Reporting Controllers (2 files) | Reporting | 8 |
| 156-162 | Core Routes (7 files) | Routes | 21 |

**Sprint 3 Total:** 60 hours, 27 files

---

### Sprint 4: Secondary Controllers & Automation
**Goal:** Cover secondary features and automation
**Estimated Hours:** 55 hours
**Coverage Target:** 52%

| ID | File | Module | Est. Hours |
|----|------|--------|------------|
| 55-56 | Warnings Controllers | Reporting | 4 |
| 57-61 | Communication Controllers | Communication | 13 |
| 62-63 | Jobs Controllers | Jobs | 6 |
| 64-66 | Applications Controllers | Applications | 8 |
| 91-92 | General Controllers | General | 4 |
| 94-96 | Map/Popup Controllers | General | 5 |
| 99-100 | Email Assignment | Email | 4 |
| 146-150 | Automation Controllers | Automation | 10 |
| 153-155 | Analytics Controllers | Analytics | 6 |

**Sprint 4 Total:** 60 hours, 25 files

---

### Sprint 5: Forms, Community, BM Dashboard Start, WebSockets
**Goal:** Begin BM Dashboard testing, cover forms and community
**Estimated Hours:** 60 hours
**Coverage Target:** 58%

| ID | File | Module | Est. Hours |
|----|------|--------|------------|
| 67-70 | Forms Controllers | Forms | 11 |
| 71-73 | Community Controllers | Community | 8 |
| 74-77 | Knowledge Base Controllers | Knowledge Base | 7 |
| 101-106 | BM Dashboard Core (6 files) | BM Dashboard | 23 |
| 151-152 | Community Portal | Community Portal | 4 |
| 165-170 | WebSockets & CronJobs | Infrastructure | 19 |

**Sprint 5 Total:** 72 hours, 24 files

---

### Sprint 6: BM Dashboard Completion
**Goal:** Complete Building Materials Dashboard testing
**Estimated Hours:** 50 hours
**Coverage Target:** 62%

| ID | File | Module | Est. Hours |
|----|------|--------|------------|
| 107-113 | BM Tracking Controllers (7 files) | BM Dashboard | 21 |
| 115-116 | BM Inventory/Issues | BM Dashboard | 5 |
| 120-122 | BM Labor/Tool Controllers | BM Dashboard | 8 |
| 125-129 | BM Risk/Issues/Expenditure | BM Dashboard | 13 |

**Sprint 6 Total:** 47 hours, 18 files

---

### Sprint 7: LB Dashboard & Remaining BM
**Goal:** Complete LB Dashboard core features
**Estimated Hours:** 45 hours
**Coverage Target:** 65%

| ID | File | Module | Est. Hours |
|----|------|--------|------------|
| 117-119 | BM Remaining (3 files) | BM Dashboard | 6 |
| 121, 123-124, 127 | BM Low Priority (4 files) | BM Dashboard | 8 |
| 130-133 | LB Core Controllers (4 files) | LB Dashboard | 15 |
| 134-135, 138, 140-141, 144 | LB Medium Priority (6 files) | LB Dashboard | 12 |

**Sprint 7 Total:** 41 hours, 17 files

---

### Sprint 8: Cleanup & Remaining Items
**Goal:** Complete all remaining low-priority items
**Estimated Hours:** 35 hours
**Coverage Target:** 68%+

| ID | File | Module | Est. Hours |
|----|------|--------|------------|
| 78-81 | Inventory Controllers | Inventory | 9 |
| 82-84 | Organization Controllers | Organization | 6 |
| 85-86 | Financial Controllers | Financial | 6 |
| 87, 89-90 | Configuration Controllers | Configuration | 6 |
| 93, 95, 97-98 | General Low Priority | General | 7 |
| 136-137, 139, 142-143, 145 | LB Low Priority (6 files) | LB Dashboard | 11 |

**Sprint 8 Total:** 45 hours, 27 files

---

## File Details by Module

### Services (9 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 1 | src/services/userService.js | P0-Critical | Not Started | src/services/__tests__/userService.spec.js | 4 |
| 2 | src/services/permissionService.js | P0-Critical | Not Started | src/services/__tests__/permissionService.spec.js | 4 |
| 3 | src/services/notificationService.js | P1-High | Not Started | src/services/__tests__/notificationService.spec.js | 3 |
| 4 | src/services/applicationsService.js | P1-High | Not Started | src/services/__tests__/applicationsService.spec.js | 3 |
| 5 | src/services/automation/appAccessService.js | P2-Medium | Not Started | src/services/automation/__tests__/appAccessService.spec.js | 2 |
| 6 | src/services/automation/dropboxService.js | P2-Medium | Not Started | src/services/automation/__tests__/dropboxService.spec.js | 2 |
| 7 | src/services/automation/githubService.js | P2-Medium | Not Started | src/services/automation/__tests__/githubService.spec.js | 2 |
| 8 | src/services/automation/sentryService.js | P2-Medium | Not Started | src/services/automation/__tests__/sentryService.spec.js | 2 |
| 9 | src/services/automation/slackService.js | P2-Medium | Not Started | src/services/automation/__tests__/slackService.spec.js | 2 |

### Helpers (10 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 10 | src/helpers/dashboardhelper.js | P1-High | Not Started | src/helpers/__tests__/dashboardhelper.spec.js | 3 |
| 11 | src/helpers/taskHelper.js | P1-High | Not Started | src/helpers/__tests__/taskHelper.spec.js | 3 |
| 12 | src/helpers/userHelper.js | P1-High | Not Started | src/helpers/__tests__/userHelper.spec.js | 3 |
| 13 | src/helpers/reporthelper.js | P2-Medium | Not Started | src/helpers/__tests__/reporthelper.spec.js | 2 |
| 14 | src/helpers/notificationhelper.js | P2-Medium | Not Started | src/helpers/__tests__/notificationhelper.spec.js | 2 |
| 15 | src/helpers/taskNotificationHelper.js | P2-Medium | Not Started | src/helpers/__tests__/taskNotificationHelper.spec.js | 2 |
| 16 | src/helpers/imageHelper.js | P3-Low | Not Started | src/helpers/__tests__/imageHelper.spec.js | 2 |
| 17 | src/helpers/overviewReportHelper.js | P2-Medium | ✅ Done | src/helpers/overviewReportHelper.spec.js | 0 |
| 18 | src/helpers/helperModels/myTeam.js | P2-Medium | Not Started | src/helpers/helperModels/__tests__/myTeam.spec.js | 2 |
| 19 | src/helpers/helperModels/myManager.js | P2-Medium | Not Started | src/helpers/helperModels/__tests__/myManager.spec.js | 2 |

### User Management Controllers (9 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 25 | src/controllers/userProfileController.js | P0-Critical | Not Started | src/controllers/__tests__/userProfileController.spec.js | 6 |
| 26 | src/controllers/logincontroller.js | P0-Critical | Not Started | src/controllers/__tests__/logincontroller.spec.js | 4 |
| 27 | src/controllers/registrationController.js | P0-Critical | Not Started | src/controllers/__tests__/registrationController.spec.js | 4 |
| 28 | src/controllers/forgotPwdcontroller.js | P1-High | Not Started | src/controllers/__tests__/forgotPwdcontroller.spec.js | 3 |
| 29 | src/controllers/forcePwdController.js | P2-Medium | Not Started | src/controllers/__tests__/forcePwdController.spec.js | 2 |
| 30 | src/controllers/isEmailExistsController.js | P2-Medium | Not Started | src/controllers/__tests__/isEmailExistsController.spec.js | 2 |
| 31 | src/controllers/profileInitialSetupController.js | P2-Medium | Not Started | src/controllers/__tests__/profileInitialSetupController.spec.js | 3 |
| 32 | src/controllers/userSkillsProfileController.js | P2-Medium | Not Started | src/controllers/__tests__/userSkillsProfileController.spec.js | 3 |
| 33 | src/controllers/userSkillTabsController.js | P3-Low | Not Started | src/controllers/__tests__/userSkillTabsController.spec.js | 2 |

### Permissions Controllers (4 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 34 | src/controllers/permissionController.js | P0-Critical | Not Started | src/controllers/__tests__/permissionController.spec.js | 5 |
| 35 | src/controllers/rolesController.js | P0-Critical | Not Started | src/controllers/__tests__/rolesController.spec.js | 4 |
| 36 | src/controllers/rolePresetsController.js | P1-High | Not Started | src/controllers/__tests__/rolePresetsController.spec.js | 3 |
| 37 | src/controllers/permissionChangeLogsController.js | P2-Medium | Not Started | src/controllers/__tests__/permissionChangeLogsController.spec.js | 2 |

### Task Controllers (6 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 38 | src/controllers/taskController.js | P0-Critical | Not Started | src/controllers/__tests__/taskController.spec.js | 6 |
| 39 | src/controllers/taskNotificationController.js | P1-High | Not Started | src/controllers/__tests__/taskNotificationController.spec.js | 3 |
| 40 | src/controllers/taskEditSuggestionController.js | P2-Medium | Not Started | src/controllers/__tests__/taskEditSuggestionController.spec.js | 2 |
| 41 | src/controllers/actionItemController.js | P2-Medium | Not Started | src/controllers/__tests__/actionItemController.spec.js | 3 |
| 42 | src/controllers/studentTaskController.js | P2-Medium | Not Started | src/controllers/__tests__/studentTaskController.spec.js | 3 |
| 43 | src/controllers/educationTaskController.js | P2-Medium | Not Started | src/controllers/__tests__/educationTaskController.spec.js | 3 |

### Time Tracking Controllers (4 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 44 | src/controllers/timeEntryController.js | P0-Critical | Not Started | src/controllers/__tests__/timeEntryController.spec.js | 5 |
| 45 | src/controllers/timelogTrackingController.js | P1-High | Not Started | src/controllers/__tests__/timelogTrackingController.spec.js | 3 |
| 46 | src/controllers/timeOffRequestController.js | P2-Medium | Not Started | src/controllers/__tests__/timeOffRequestController.spec.js | 3 |
| 47 | src/controllers/timeZoneAPIController.js | P3-Low | Not Started | src/controllers/__tests__/timeZoneAPIController.spec.js | 2 |

### Project Controllers (4 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 48 | src/controllers/projectController.js | P0-Critical | Not Started | src/controllers/__tests__/projectController.spec.js | 5 |
| 49 | src/controllers/projectStatusController.js | P1-High | Not Started | src/controllers/__tests__/projectStatusController.spec.js | 3 |
| 50 | src/controllers/wbsController.js | P1-High | ✅ Partial | src/__tests__/integration/wbsRoutes.integration.test.js | 2 |
| 51 | src/controllers/lessonPlanController.js | P2-Medium | Not Started | src/controllers/__tests__/lessonPlanController.spec.js | 2 |

### Team & Reporting Controllers (6 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 52 | src/controllers/teamController.js | P0-Critical | Not Started | src/controllers/__tests__/teamController.spec.js | 5 |
| 53 | src/controllers/dashBoardController.js | P1-High | Not Started | src/controllers/__tests__/dashBoardController.spec.js | 4 |
| 54 | src/controllers/reportsController.js | P1-High | Not Started | src/controllers/__tests__/reportsController.spec.js | 4 |
| 55 | src/controllers/warningsController.js | P2-Medium | Not Started | src/controllers/__tests__/warningsController.spec.js | 2 |
| 56 | src/controllers/currentWarningsController.js | P2-Medium | Not Started | src/controllers/__tests__/currentWarningsController.spec.js | 2 |

### Communication Controllers (5 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 57 | src/controllers/announcementController.js | P2-Medium | Not Started | src/controllers/__tests__/announcementController.spec.js | 3 |
| 58 | src/controllers/notificationController.js | P1-High | Not Started | src/controllers/__tests__/notificationController.spec.js | 3 |
| 59 | src/controllers/emailController.js | P2-Medium | Not Started | src/controllers/__tests__/emailController.spec.js | 3 |
| 60 | src/controllers/followUpController.js | P3-Low | Not Started | src/controllers/__tests__/followUpController.spec.js | 2 |
| 61 | src/controllers/ownerMessageController.js | P3-Low | Not Started | src/controllers/__tests__/ownerMessageController.spec.js | 2 |

### BM Dashboard Controllers (29 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 101 | src/controllers/bmdashboard/bmProjectController.js | P1-High | Not Started | src/controllers/bmdashboard/__tests__/bmProjectController.spec.js | 4 |
| 102 | src/controllers/bmdashboard/bmFinancialController.js | P1-High | Not Started | src/controllers/bmdashboard/__tests__/bmFinancialController.spec.js | 4 |
| 103 | src/controllers/bmdashboard/bmMaterialsController.js | P1-High | Not Started | src/controllers/bmdashboard/__tests__/bmMaterialsController.spec.js | 4 |
| 104 | src/controllers/bmdashboard/bmEquipmentController.js | P1-High | Not Started | src/controllers/bmdashboard/__tests__/bmEquipmentController.spec.js | 4 |
| 105 | src/controllers/bmdashboard/bmToolController.js | P1-High | Not Started | src/controllers/bmdashboard/__tests__/bmToolController.spec.js | 4 |
| 106 | src/controllers/bmdashboard/bmConsumableController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/bmConsumableController.spec.js | 3 |
| 107 | src/controllers/bmdashboard/bmInjuryController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/bmInjuryController.spec.js | 3 |
| 108 | src/controllers/bmdashboard/bmTimeLoggerController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/bmTimeLoggerController.spec.js | 3 |
| 109 | src/controllers/bmdashboard/projectCostController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/projectCostController.spec.js | 3 |
| 110 | src/controllers/bmdashboard/projectCostTrackingController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/projectCostTrackingController.spec.js | 3 |
| 111 | src/controllers/bmdashboard/bmActualVsPlannedCostController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/bmActualVsPlannedCostController.spec.js | 3 |
| 112 | src/controllers/bmdashboard/toolUtilizationController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/toolUtilizationController.spec.js | 3 |
| 113 | src/controllers/bmdashboard/bmRentalChartController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/bmRentalChartController.spec.js | 2 |
| 114 | src/controllers/bmdashboard/bmLoginController.js | P2-Medium | ✅ Done | src/controllers/bmdashboard/__tests__/bmLoginController.spec.js | 0 |
| 115 | src/controllers/bmdashboard/bmInventoryTypeController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/bmInventoryTypeController.spec.js | 2 |
| 116 | src/controllers/bmdashboard/bmIssueController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/bmIssueController.spec.js | 3 |
| 117 | src/controllers/bmdashboard/bmNewLessonController.js | P3-Low | Not Started | src/controllers/bmdashboard/__tests__/bmNewLessonController.spec.js | 2 |
| 118 | src/controllers/bmdashboard/bmReusableController.js | P3-Low | Not Started | src/controllers/bmdashboard/__tests__/bmReusableController.spec.js | 2 |
| 119 | src/controllers/bmdashboard/bmDashboardPrototypeController.js | P3-Low | Not Started | src/controllers/bmdashboard/__tests__/bmDashboardPrototypeController.spec.js | 2 |
| 120 | src/controllers/bmdashboard/bmPaidLaborCostController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/bmPaidLaborCostController.spec.js | 3 |
| 121 | src/controllers/bmdashboard/bmExternalTeamController.js | P3-Low | Not Started | src/controllers/bmdashboard/__tests__/bmExternalTeamController.spec.js | 2 |
| 122 | src/controllers/bmdashboard/bmToolAvailabilityController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/bmToolAvailabilityController.spec.js | 2 |
| 123 | src/controllers/bmdashboard/bmToolsReturnedLateController.js | P3-Low | Not Started | src/controllers/bmdashboard/__tests__/bmToolsReturnedLateController.spec.js | 2 |
| 124 | src/controllers/bmdashboard/bmToolsDowntimeController.js | P3-Low | Not Started | src/controllers/bmdashboard/__tests__/bmToolsDowntimeController.spec.js | 2 |
| 125 | src/controllers/bmdashboard/projectRiskProfileController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/projectRiskProfileController.spec.js | 2 |
| 126 | src/controllers/bmdashboard/toolAvailabilityController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/toolAvailabilityController.spec.js | 2 |
| 127 | src/controllers/bmdashboard/injuryCategoryController.js | P3-Low | Not Started | src/controllers/bmdashboard/__tests__/injuryCategoryController.spec.js | 2 |
| 128 | src/controllers/bmdashboard/IssuesController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/IssuesController.spec.js | 3 |
| 129 | src/controllers/bmdashboard/expenditureController.js | P2-Medium | Not Started | src/controllers/bmdashboard/__tests__/expenditureController.spec.js | 3 |

### LB Dashboard Controllers (16 files)

| ID | File | Priority | Status | Test File | Hours |
|----|------|----------|--------|-----------|-------|
| 130 | src/controllers/lbdashboard/listingsController.js | P1-High | Not Started | src/controllers/lbdashboard/__tests__/listingsController.spec.js | 4 |
| 131 | src/controllers/lbdashboard/bidsController.js | P1-High | Not Started | src/controllers/lbdashboard/__tests__/bidsController.spec.js | 4 |
| 132 | src/controllers/lbdashboard/paymentsController.js | P1-High | Not Started | src/controllers/lbdashboard/__tests__/paymentsController.spec.js | 4 |
| 133 | src/controllers/lbdashboard/biddingController.js | P2-Medium | Not Started | src/controllers/lbdashboard/__tests__/biddingController.spec.js | 3 |
| 134 | src/controllers/lbdashboard/bidDeadlinesController.js | P2-Medium | Not Started | src/controllers/lbdashboard/__tests__/bidDeadlinesController.spec.js | 2 |
| 135 | src/controllers/lbdashboard/bidNotificationsController.js | P2-Medium | Not Started | src/controllers/lbdashboard/__tests__/bidNotificationsController.spec.js | 2 |
| 136 | src/controllers/lbdashboard/bidPropertyController.js | P3-Low | Not Started | src/controllers/lbdashboard/__tests__/bidPropertyController.spec.js | 2 |
| 137 | src/controllers/lbdashboard/bidTermsController.js | P3-Low | Not Started | src/controllers/lbdashboard/__tests__/bidTermsController.spec.js | 2 |
| 138 | src/controllers/lbdashboard/lbmessageController.js | P2-Medium | Not Started | src/controllers/lbdashboard/__tests__/lbmessageController.spec.js | 2 |
| 139 | src/controllers/lbdashboard/lbuserPrefController.js | P3-Low | Not Started | src/controllers/lbdashboard/__tests__/lbuserPrefController.spec.js | 2 |
| 140 | src/controllers/lbdashboard/listingAvailablityController.js | P2-Medium | Not Started | src/controllers/lbdashboard/__tests__/listingAvailablityController.spec.js | 2 |
| 141 | src/controllers/lbdashboard/smsController.js | P2-Medium | Not Started | src/controllers/lbdashboard/__tests__/smsController.spec.js | 2 |
| 142 | src/controllers/lbdashboard/userBidNotificationController.js | P3-Low | Not Started | src/controllers/lbdashboard/__tests__/userBidNotificationController.spec.js | 2 |
| 143 | src/controllers/lbdashboard/villages.js | P3-Low | Not Started | src/controllers/lbdashboard/__tests__/villages.spec.js | 1 |
| 144 | src/controllers/lbdashboard/webhookController.js | P2-Medium | Not Started | src/controllers/lbdashboard/__tests__/webhookController.spec.js | 2 |
| 145 | src/controllers/lbdashboard/wishlistsController.js | P3-Low | Not Started | src/controllers/lbdashboard/__tests__/wishlistsController.spec.js | 2 |

---

## Import Instructions

### For Jira
1. Go to your Jira project
2. Click "Import Issues" from the project sidebar
3. Select "CSV" format
4. Upload `test-improvement-plan.csv`
5. Map columns: ID → Key, File Path → Summary, Module → Component, Priority → Priority, Status → Status, Sprint → Sprint, Estimated Hours → Story Points

### For ClickUp
1. Open your ClickUp space
2. Click the three dots menu → Import/Export → Import
3. Select CSV
4. Upload `test-improvement-plan.csv`
5. Map fields accordingly
6. Set "Sprint" as a custom field for tracking

### For Excel/Google Sheets
1. Open Excel or Google Sheets
2. File → Import → Upload `test-improvement-plan.csv`
3. Use filters to sort by Priority, Module, or Sprint
4. Add conditional formatting for Status column

---

## Acceptance Criteria Template

For each test file, ensure:

- [ ] All exported functions have at least one test
- [ ] Happy path scenarios covered
- [ ] Error handling scenarios covered
- [ ] Edge cases identified and tested
- [ ] Mocks properly set up for dependencies
- [ ] Test file follows naming convention (*.spec.js for unit, *.test.js for integration)
- [ ] Coverage meets 60% threshold for the file
