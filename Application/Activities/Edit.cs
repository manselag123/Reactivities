using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Edit
    {
        public class Command :IRequest
        {
            public Activity activity{get;set;}
        }
        public class Handler : IRequestHandler<Command>
        {
            
            private DataContext _context ;
            private IMapper _mapper;
            public Handler(DataContext dataContext,IMapper mapper){
                _context = dataContext;
                _mapper =mapper;
            }


            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
               
               
               var activity = await _context.Activities.FindAsync(request.activity.Id);
               _mapper.Map(request.activity,activity);
               await _context.SaveChangesAsync();
               return Unit.Value;

            }
        }
    }
}