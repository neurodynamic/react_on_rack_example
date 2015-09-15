require 'sass/plugin/rack'
require "autoprefixer-rails"
require "slim"
require 'fileutils'

class ToPrefixed
  def initialize(app)
    @app = app
  end
 
  def call(env)
    status, headers, body  = @app.call(env)
 
    css = File.read('public/stylesheets/app.css')

    prefixed_css = AutoprefixerRails.process(css, from: 'app.css').css

    File.open('public/stylesheets/app.css', "wb") do |file|
      file.write(prefixed_css)
    end

    [status, headers, body]
  end
end

class SlimToHTML
  def initialize(app)
    @app = app
  end
 
  def call(env)
    status, headers, body  = @app.call(env)
 
    html = Slim::Template.new('public/index.slim').render

    File.open('public/index.html', "wb") do |file|
      file.write(html)
    end

    [status, headers, body]
  end
end



use Sass::Plugin::Rack
use ToPrefixed
use SlimToHTML

use Rack::Static,
  :urls => ["/images", "/js", "/stylesheets"],
  :root => "public"

run lambda { |env|
  FileUtils.touch('public/index.html')
  
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}