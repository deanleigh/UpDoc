using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using UpDoc.Services;

namespace UpDoc.NotificationHandlers;

/// <summary>
/// Triggers workflow migration on application startup.
/// Generates workflow.json for any existing workflows that don't have one yet.
/// </summary>
public class WorkflowMigrationHandler : INotificationHandler<UmbracoApplicationStartedNotification>
{
    private readonly IWorkflowService _workflowService;

    public WorkflowMigrationHandler(IWorkflowService workflowService)
    {
        _workflowService = workflowService;
    }

    public void Handle(UmbracoApplicationStartedNotification notification)
    {
        // Force the singleton to be constructed and run migration.
        // WorkflowService.MigrateExistingWorkflows() is called in the constructor.
        // Simply resolving the service is enough to trigger it.
        // We also call GetAllWorkflowSummaries to verify the workflows load correctly.
        _ = _workflowService.GetAllWorkflowSummaries();
    }
}
