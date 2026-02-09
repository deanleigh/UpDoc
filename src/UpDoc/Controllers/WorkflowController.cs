using Asp.Versioning;
using UpDoc.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Web.Common.Authorization;

namespace UpDoc.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("umbraco/management/api/v{version:apiVersion}/updoc/workflows")]
[MapToApi("updoc")]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
[JsonOptionsName("UmbracoManagementApi")]
public class WorkflowController : ControllerBase
{
    private readonly IWorkflowService _workflowService;

    public WorkflowController(IWorkflowService workflowService)
    {
        _workflowService = workflowService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var summaries = _workflowService.GetAllWorkflowSummaries();
        return Ok(summaries);
    }

    [HttpGet("{name}")]
    public IActionResult GetByName(string name)
    {
        var configs = _workflowService.GetAllConfigs();
        var config = configs.FirstOrDefault(c =>
            Path.GetFileName(c.FolderPath).Equals(name, StringComparison.OrdinalIgnoreCase));

        if (config == null)
        {
            return NotFound(new { error = $"No workflow found with name '{name}'" });
        }

        return Ok(config);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateWorkflowRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { error = "Workflow name is required." });
        }

        if (string.IsNullOrWhiteSpace(request.DocumentTypeAlias))
        {
            return BadRequest(new { error = "Document type alias is required." });
        }

        try
        {
            _workflowService.CreateWorkflow(
                request.Name,
                request.DocumentTypeAlias,
                request.BlueprintId,
                request.BlueprintName);

            return Created(
                $"/umbraco/management/api/v1/updoc/workflows/{request.Name}",
                new { name = request.Name });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { error = ex.Message });
        }
    }
}

public class CreateWorkflowRequest
{
    public string Name { get; set; } = string.Empty;
    public string DocumentTypeAlias { get; set; } = string.Empty;
    public string? BlueprintId { get; set; }
    public string? BlueprintName { get; set; }
}
