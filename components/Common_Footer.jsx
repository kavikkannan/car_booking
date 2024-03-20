import Link from 'next/link';
import Image from 'next/image';

const Common_footer = () => {
    return (
        <footer className="bg-gray-800  bottom-0 w-full text-white py-2 flex justify-between pr-2 pl-2   ">
            
            <div>
                <p className="mb-4">padmapriya.v2022@vitstudent.ac.in
</p>   
            </div>
            <div>
                <center><p>&copy; {new Date().getFullYear()} VP-solutions. All Rights Reserved.</p></center>
            </div>
            
            
            
                    <div className="flex justify-end  space-x-4 mb-4">
                    
                        <Link href="#">
                            
                                <Image src="/images/Instagram_Glyph_Gradient.png" alt="Instagram" width={32} height={32} />
                        
                        </Link>
                        <Link href="#">
                            
                                <Image className='' src="/images/LI-In-Bug.png" alt="LinkedIn" width={32} height={32} />
                            
                        </Link>
                        <Link href="#">
                        
                                <Image src="/images/Facebook_Logo_Primary.png" alt="Facebook" width={32} height={32} />
                            
                        </Link>
                   
                      
            </div>
        </footer>
    );
};

export default Common_footer;
