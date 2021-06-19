using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
           _context = context; 
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> Get()
        {
              return await _context.Activities.ToListAsync();
        }
        [HttpGet("{id}")]  // activities /id
        public async Task<ActionResult<Activity>> Get(Guid id){
            return await _context.Activities.FindAsync(id);
        }
    }
}