
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function StudentDetail() {
  return (
    <div className="bg-[#2D2D2D] text-white p-8">
      <h1 className="text-4xl font-bold mb-2">STUDENT DETAILS</h1>
      <nav className="text-[#BCBCBC] text-sm mb-6">
        {`
        Home > Students > Student Details
      `}
      </nav>
      <div className="flex items-center justify-between bg-[#1E1E1E] p-4 mb-6">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage alt="Sandeep M" src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-lg font-semibold">Sandeep M</div>
            <div className="text-[#BCBCBC] text-sm">1JS19CS146</div>
          </div>
        </div>
        <Button className="text-xs" variant="secondary">
          EDIT
        </Button>
      </div>
      <section>
        <h2 className="text-2xl font-semibold mb-2">GENERAL DETAILS</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="w-1/3">USN</span>
            <span className="w-2/3 bg-[#1E1E1E] p-2">1JS19CS146</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-1/3">EMAIL</span>
            <span className="w-2/3 bg-[#1E1E1E] p-2">1js19cs146@sjce.sjtab.ac.in</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-1/3">BRANCH & SECTION</span>
            <span className="w-2/3 bg-[#1E1E1E] p-2">CSE C</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-1/3">YEAR</span>
            <span className="w-2/3 bg-[#1E1E1E] p-2">2023</span>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">ACADEMIC DETAILS</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="w-1/3">CGPA</span>
            <span className="w-2/3 bg-[#1E1E1E] p-2">8.5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-1/3">10TH MARK'S PERCENTAGE</span>
            <span className="w-2/3 bg-[#1E1E1E] p-2">90.5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-1/3">12TH MARK'S PERCENTAGE</span>
            <span className="w-2/3 bg-[#1E1E1E] p-2">92</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-1/3">BACKLOGS</span>
            <span className="w-2/3 bg-[#1E1E1E] p-2">0</span>
          </div>
        </div>
      </section>
    </div>
  )
}