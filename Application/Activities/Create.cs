using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity activity { get; set; }
        } 
        public class Handler : IRequestHandler<Command>
        {
            public DataContext _context { get; } 
            public Handler(DataContext context){
                _context = context;
            } 
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.activity);
               await _context.SaveChangesAsync();
                return  Unit.Value;
            }
        }
    }
}