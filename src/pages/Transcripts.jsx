import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, GraduationCap, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Transcripts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDownloading, setIsDownloading] = useState(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const transcripts = [
    {
      id: 1,
      semester: 'Semester 1',
      year: '2023-24',
      cgpa: '8.5',
      credits: '24',
      status: 'Official',
      subjects: [
        { name: 'Engineering Mathematics I', code: 'MATH101', grade: 'A', credits: 4 },
        { name: 'Programming in C', code: 'CS101', grade: 'A+', credits: 4 },
        { name: 'Engineering Physics', code: 'PHY101', grade: 'B+', credits: 3 },
        { name: 'Engineering Chemistry', code: 'CHEM101', grade: 'A', credits: 3 },
        { name: 'Environmental Science', code: 'EVS101', grade: 'A', credits: 2 },
        { name: 'Communication Skills', code: 'ENG101', grade: 'B+', credits: 2 },
        { name: 'Engineering Drawing', code: 'DRAW101', grade: 'A+', credits: 3 },
        { name: 'Workshop Practice', code: 'WS101', grade: 'A', credits: 3 }
      ]
    },
    {
      id: 2,
      semester: 'Semester 2',
      year: '2023-24',
      cgpa: '8.7',
      credits: '26',
      status: 'Official',
      subjects: [
        { name: 'Engineering Mathematics II', code: 'MATH102', grade: 'A+', credits: 4 },
        { name: 'Data Structures', code: 'CS102', grade: 'A+', credits: 4 },
        { name: 'Digital Logic Design', code: 'CS103', grade: 'A', credits: 4 },
        { name: 'Object Oriented Programming', code: 'CS104', grade: 'A', credits: 4 },
        { name: 'Engineering Economics', code: 'ECO101', grade: 'B+', credits: 3 },
        { name: 'Professional Ethics', code: 'ETH101', grade: 'A', credits: 2 },
        { name: 'Computer Graphics', code: 'CS105', grade: 'A+', credits: 3 },
        { name: 'Database Management', code: 'CS106', grade: 'A', credits: 2 }
      ]
    },
    {
      id: 3,
      semester: 'Semester 3',
      year: '2024-25',
      cgpa: '8.3',
      credits: '25',
      status: 'Provisional',
      subjects: [
        { name: 'Engineering Mathematics III', code: 'MATH103', grade: 'A', credits: 4 },
        { name: 'Computer Networks', code: 'CS201', grade: 'A+', credits: 4 },
        { name: 'Operating Systems', code: 'CS202', grade: 'B+', credits: 4 },
        { name: 'Software Engineering', code: 'CS203', grade: 'A', credits: 4 },
        { name: 'Web Technologies', code: 'CS204', grade: 'A+', credits: 4 },
        { name: 'Microprocessors', code: 'CS205', grade: 'B+', credits: 3 },
        { name: 'Technical Writing', code: 'ENG201', grade: 'A', credits: 2 }
      ]
    }
  ];

  const filteredTranscripts = transcripts.filter(transcript =>
    transcript.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transcript.year.includes(searchTerm) ||
    transcript.subjects.some(subject => 
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDownload = async (transcriptId, type) => {
    setIsDownloading(transcriptId);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Download Started",
      description: `Your ${type} transcript is being downloaded.`,
    });
    
    setIsDownloading(null);
  };

  const handleViewTranscript = (transcript) => {
    toast({
      title: "Transcript Details",
      description: `Viewing ${transcript.semester} ${transcript.year} details.`,
    });
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'bg-green-600';
      case 'A': return 'bg-green-500';
      case 'B+': return 'bg-blue-500';
      case 'B': return 'bg-blue-400';
      case 'C+': return 'bg-yellow-500';
      case 'C': return 'bg-yellow-400';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-university-light-gray">
      {/* Header */}
      <header className="bg-white border-b border-university-light-blue/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center text-university-blue hover:text-university-navy transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-university-navy">Academic Transcripts</h1>
                <p className="text-xs text-university-gray">{user.name} - {user.rollNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="p-6 border-0 shadow-medium mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-university-navy">Your Transcripts</h2>
            <Badge className="bg-university-blue">
              Overall CGPA: 8.5
            </Badge>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray" />
            <Input
              placeholder="Search by semester, year, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Transcripts List */}
        <div className="space-y-6">
          {filteredTranscripts.map((transcript) => (
            <Card key={transcript.id} className="p-6 border-0 shadow-medium">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-university-navy">
                    {transcript.semester} - {transcript.year}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-university-gray">
                      CGPA: <span className="font-semibold text-university-navy">{transcript.cgpa}</span>
                    </span>
                    <span className="text-sm text-university-gray">
                      Credits: <span className="font-semibold text-university-navy">{transcript.credits}</span>
                    </span>
                    <Badge 
                      variant={transcript.status === 'Official' ? 'default' : 'secondary'}
                      className={transcript.status === 'Official' ? 'bg-green-500' : 'bg-yellow-500'}
                    >
                      {transcript.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewTranscript(transcript)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(transcript.id, 'Official')}
                    disabled={isDownloading === transcript.id}
                    className="bg-university-blue hover:bg-university-navy"
                  >
                    {isDownloading === transcript.id ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Downloading...
                      </div>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Subjects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {transcript.subjects.map((subject, index) => (
                  <div key={index} className="p-4 bg-university-light-gray rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-university-navy text-sm leading-tight">
                        {subject.name}
                      </h4>
                      <Badge className={`${getGradeColor(subject.grade)} text-white text-xs ml-2`}>
                        {subject.grade}
                      </Badge>
                    </div>
                    <p className="text-xs text-university-gray mb-1">
                      Code: {subject.code}
                    </p>
                    <p className="text-xs text-university-gray">
                      Credits: {subject.credits}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {filteredTranscripts.length === 0 && (
          <Card className="p-12 border-0 shadow-medium text-center">
            <FileText className="w-16 h-16 text-university-gray mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-university-navy mb-2">No Transcripts Found</h3>
            <p className="text-university-gray">No transcripts match your search criteria.</p>
          </Card>
        )}

        {/* Official Transcript Request */}
        <Card className="p-6 border-0 shadow-medium mt-8">
          <h3 className="text-xl font-semibold text-university-navy mb-4">Request Official Transcript</h3>
          <p className="text-university-gray mb-4">
            Need an official transcript for job applications or higher studies? Request one below.
          </p>
          <div className="flex items-center space-x-4">
            <Button className="bg-university-gold hover:bg-university-light-gold text-university-navy font-semibold">
              <FileText className="w-4 h-4 mr-2" />
              Request Official Transcript
            </Button>
            <span className="text-sm text-university-gray">
              Processing time: 3-5 business days
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Transcripts;