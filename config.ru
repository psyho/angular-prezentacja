use Rack::Static, :urls => ["/css", "/js", "/images", '/views', '/slides'], :root => "public"

index_html = File.expand_path('../public/index.html', __FILE__)
run lambda{|env| return [200, {"Content-Type" => "text/html"}, [File.read(index_html)]]}
