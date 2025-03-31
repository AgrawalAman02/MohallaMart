import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/use-debouncing'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Search, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [businesses, setBusinesses] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigator = useNavigate();
  
  const debouncedSearch = useDebounce(searchTerm, 200)

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (debouncedSearch.length < 2) {
        setBusinesses([])
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/businesses/search?q=${debouncedSearch}`)
        const data = await response.json()
        console.log(response);
        console.log(data);
        
        
        setBusinesses(data.businesses)
        setOpen(true)
      } catch (error) {
        console.error('Error fetching businesses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinesses()
  }, [debouncedSearch])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Find Local Businesses</h1>
          <p className="text-muted-foreground">
            Search for businesses in your area
          </p>
        </div>

        <div className="relative">
          <Popover open={open && businesses.length > 0} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandEmpty>
                  {loading ? (
                    <p className="p-4 text-center text-sm">Loading...</p>
                  ) : (
                    <p className="p-4 text-center text-sm">No businesses found.</p>
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {businesses.map((business) => (
                  <CommandItem 
                  key={business._id}
                  onSelect={() => {
                      // Handle business selection
                      setOpen(false)
                      console.log("Did something");
                      
                      navigator(`/business-profile/${business._id}`)
                  }}
                  className="p-2 cursor-pointer"
              >
                  <Card className="w-full p-4">
                      <div className="flex items-start gap-4">
                          {/* Logo section */}
                          {business.logo && (
                              <img
                                  src={business.logo}
                                  alt={business.name}
                                  className="w-16 h-16 object-cover rounded"
                              />
                          )}
                          <div className="flex-1">
                              <h3 className="font-semibold">{business.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                  {business.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                  <MapPin className="w-4 h-4" />
                                  <span>
                                      {business.address.street}, {business.address.city}, {business.address.state} {business.address.zipCode}, {business.address.country}
                                  </span>
                              </div>
                              {/* Images section */}
                              {business.images && business.images.length > 0 && (
                                  <div className="flex gap-2 mt-3 overflow-x-auto">
                                      {business.images.map((image, index) => (
                                          <img
                                              key={index}
                                              src={image}
                                              alt={`${business.name} image ${index + 1}`}
                                              className="w-16 h-16 object-cover rounded"
                                          />
                                      ))}
                                  </div>
                              )}
                          </div>
                      </div>
                  </Card>
              </CommandItem>
              
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}