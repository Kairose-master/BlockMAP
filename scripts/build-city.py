"""BlockMAP's editable architectural atlas. Run in Blender 5.2 / 3D Jutsu.

Logical coordinates are x/z (web); Blender coordinates are x/-z/height.
All district geometry is parented to district-{id} for web raycasting.
"""
import bpy
import math
from mathutils import Vector

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

def material(name, color, roughness=0.75, metallic=0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    p = m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value = (*color, 1)
    p.inputs['Roughness'].default_value = roughness
    p.inputs['Metallic'].default_value = metallic
    return m

ivory = material('Warm porcelain / building shells', (.79,.81,.76))
white = material('Chalk / roof caps', (.94,.95,.89))
stone = material('Limestone / plinth', (.65,.69,.64))
road = material('Concrete / streets', (.64,.69,.65))
ground = material('Warm grey / background', (.83,.86,.81))
glass = material('Smoked jade / glazing', (.15,.28,.26), .27, .15)
dark = material('Charcoal / metalwork', (.10,.17,.16), .55)
leaf = material('Deep sage / trees', (.19,.34,.25))
grass = material('Sage / planted beds', (.49,.61,.47))
water = material('Still jade / water', (.32,.61,.57), .24, .1)
wood = material('Oak / benches', (.58,.40,.27))
paint = material('Road markings', (.89,.91,.85))
accents = {k:material(k+' / district accent',c) for k,c in {
    'start':(.15,.40,.33), 'transit':(.31,.49,.55),
    'earn':(.22,.40,.29), 'swap':(.22,.51,.44),
    'pay':(.64,.40,.25), 'collect':(.48,.34,.46),
    'identity':(.35,.42,.57), 'join':(.59,.33,.27)}.items()}

def finish(o, name, mat, parent=None):
    o.name = name
    o.data.materials.append(mat)
    if parent: o.parent = parent
    return o

def box(name,x,z,h,w,d,t,mat=ivory,parent=None,bevel=.04):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x,-z,h))
    o = bpy.context.object
    o.dimensions = (w,d,t)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    finish(o,name,mat,parent)
    if bevel:
        b=o.modifiers.new('Soft manufactured edges','BEVEL')
        b.width=bevel; b.segments=2
        o.modifiers.new('Weighted corner normals','WEIGHTED_NORMAL')
    return o

def cylinder(name,x,z,h,r,t,mat=ivory,parent=None,vertices=32):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=r, depth=t, location=(x,-z,h))
    o=finish(bpy.context.object,name,mat,parent)
    b=o.modifiers.new('Soft cylinder edge','BEVEL');b.width=.035;b.segments=2
    o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
    return o

def sphere(name,x,z,h,r,mat,parent=None,scale=(1,1,1)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=r, location=(x,-z,h))
    o=finish(bpy.context.object,name,mat,parent);o.scale=scale
    for p in o.data.polygons:p.use_smooth=True
    return o

def tree(x,z,parent=None,small=False):
    s=.72 if small else 1
    cylinder('Tree / trunk',x,z,.6*s,.08,1*s,wood,parent,8)
    sphere('Tree / crown',x,z,1.33*s,.51*s,leaf,parent,scale=(.86,.86,1.25))

def building(name,x,z,w,d,h,parent,accent=None):
    box(name+' / body',x,z,.46+h/2,w,d,h,ivory,parent,.055)
    box(name+' / flat roof',x,z,.48+h,w+.15,d+.15,.12,white,parent)
    for level in range(max(1,int(h/.65))):
        y=.82+level*.62
        if y>h+.2: break
        box(name+' / front glazing',x,z+d/2+.012,y,w-.26,.025,.26,glass,parent,0)
        box(name+' / side glazing',x+w/2+.012,z,y,.025,d-.26,.26,glass,parent,0)
    if accent:box(name+' / entrance',x,z+d/2+.05,.87,.58,.16,.80,accent,parent)

# One continuous city model with streets between district blocks.
box('Atlas / floating foundation',0,0,-.21,34,29,.8,stone,bevel=.35)
box('Atlas / street level',0,0,.19,33.7,28.7,.16,road,bevel=.26)
box('Studio ground',0,0,-.72,150,150,.12,ground,bevel=0)
for x in [-5.5,5.5]:
    for z in range(-13,14,2):box('Street / lane dash',x,z,.286,.065,.70,.01,paint,bevel=0)
for z in [-4.5,4.5]:
    for x in range(-15,16,2):box('Street / lane dash',x,z,.286,.70,.065,.01,paint,bevel=0)
for x in [-5.5,5.5]:
    for z in [-4.5,4.5]:
        for j in range(5):
            box('Crosswalk',x-1+j*.43,z+1.5,.29,.23,.82,.012,paint,bevel=0)
            box('Crosswalk',x+1.4,z-1+j*.43,.29,.82,.23,.012,paint,bevel=0)

districts=[('start',-11,9),('transit',-11,0),('earn',-11,-9),('swap',0,-9),('pay',11,-9),('collect',11,0),('identity',11,9),('join',0,9)]
for key,x,z in districts:
    parent=bpy.data.objects.new('district-'+key,None)
    bpy.context.collection.objects.link(parent)
    a=accents[key]
    box(key+' / pedestrian platform',x,z,.36,9.0,7.0,.20,white,parent,.12)
    box(key+' / address strip',x,z+3.28,.48,7.2,.12,.035,a,parent,0)
    for tx,tz in [(-3.6,-2.6),(3.5,-2.6),(-3.6,2.5),(3.5,2.5)]:
        cylinder(key+' / tree planter',x+tx,z+tz,.50,.42,.15,stone,parent,16)
        tree(x+tx,z+tz,parent,True)
    # A compact back street lends a consistent scale without repeated identical blocks.
    for offset,h in [(-2.8,1.0),(0,1.5),(2.8,1.15)]:
        if key not in ['transit','earn']:
            building(key+' / atelier',x+offset,z-2.0,1.3,1.0,h,parent)
    if key=='start':
        for dx in [-1.65,1.65]:
            building('Gateway tower',x+dx,z+.15,1.35,2.1,3.9,parent,a)
        box('Gateway / connecting lintel',x,z+.15,4.08,4.7,2.22,.55,a,parent,.08)
        box('Gateway / recessed entrance',x,z+.10,.72,1.85,1.7,.5,glass,parent)
        box('Gateway / entry steps',x,z+1.9,.53,4.6,.8,.13,stone,parent)
    elif key=='transit':
        box('Station / glazed hall',x,z,1.12,6.6,2.5,1.25,glass,parent)
        box('Station / cantilever canopy',x,z,1.93,7.2,3.0,.27,a,parent,.12)
        for dx in [-2.8,-1.4,0,1.4,2.8]:
            box('Station / skylight',x+dx,z,2.09,.75,2.2,.1,white,parent)
        for dz in [2,2.65]:
            for rail in [-.22,.22]:box('Tram / rail',x,z+dz+rail,.50,7.3,.06,.06,dark,parent,0)
        box('Tram / carriage',x-.6,z+2.3,.97,3.3,.75,.83,white,parent,.22)
        box('Tram / window band',x-.6,z+2.69,1.06,2.8,.025,.25,a,parent,0)
        for dx in [-1.6,-.1,.9]:box('Tram / window pillar',x+dx,z+2.71,1.06,.07,.03,.3,white,parent,0)
    elif key=='earn':
        building('Finance / tower base',x-.6,z,3.0,2.8,1.8,parent,a)
        building('Finance / tall volume',x-1.0,z-.3,2.15,2.0,5.9,parent,a)
        box('Finance / crown',x-1,z-.3,6.45,2.3,2.15,.18,a,parent)
        building('Finance / companion',x+2,z+1,1.9,2.4,3.3,parent,a)
        box('Finance / garden court',x+1.0,z-2.25,.52,3.0,1.1,.13,grass,parent)
        tree(x+1,z-2.2,parent,True)
    elif key=='swap':
        for dx in [-1.7,1.7]:
            cylinder('Exchange / glazed drum',x+dx,z+.3,1.85,1.25,2.75,glass,parent)
            for level in [.58,1.55,2.48,3.23]:cylinder('Exchange / circular slab',x+dx,z+.3,level,1.38,.15,white,parent)
            cylinder('Exchange / roof garden',x+dx,z+.3,3.34,1.14,.1,a,parent)
        box('Exchange / skybridge',x,z+.3,2.30,2.0,.85,.40,a,parent)
    elif key=='pay':
        box('Market / main pavilion',x,z+.4,1.2,5.8,2.1,1.45,ivory,parent)
        box('Market / terracotta roof',x,z+.4,2.03,6.2,2.5,.23,a,parent)
        for dx in [-2.2,-.75,.75,2.2]:
            box('Market / shopfront',x+dx,z+1.47,1.05,1.05,.03,.9,glass,parent,0)
            box('Market / awning',x+dx,z+1.72,1.7,1.20,.7,.13,a,parent)
        for dx in [-2,0,2]:
            cylinder('Market / cafe table',x+dx,z+2.6,.9,.3,.08,white,parent,16)
            cylinder('Market / table stem',x+dx,z+2.6,.7,.045,.40,dark,parent,8)
    elif key=='collect':
        cylinder('Museum / drum',x,z+.2,1.50,2.1,2.0,ivory,parent,48)
        cylinder('Museum / floating roof',x,z+.2,2.58,2.40,.22,white,parent,48)
        cylinder('Museum / roof oculus',x,z+.2,2.72,.92,.10,glass,parent,48)
        for i in range(20):
            t=i*math.tau/20
            box('Museum / vertical fins',x+2.12*math.cos(t),z+.2+2.12*math.sin(t),1.5,.10,.10,1.8,a,parent,0)
        bpy.ops.mesh.primitive_torus_add(major_segments=32,minor_segments=8,location=(x+3,-(z+1.4),1.45),major_radius=.58,minor_radius=.13,rotation=(math.pi/2,0,0))
        finish(bpy.context.object,'Museum / sculpture',a,parent)
    elif key=='identity':
        building('Registry / main hall',x,z+.1,4.5,2.25,2.4,parent,a)
        for dx in [-1.8,-.9,0,.9,1.8]:box('Registry / facade fin',x+dx,z+1.4,1.7,.13,.35,2.3,white,parent,0)
        box('Registry / archive monolith',x+1.4,z-.1,2.7,1.1,1.8,4.4,a,parent,.07)
        box('Registry / monolith slit',x+1.4,z+.82,2.8,.12,.035,3.55,white,parent,0)
    else:
        for i in range(4):cylinder('Forum / stepped rotunda',x,z+.25,.58+i*.36,2.35-i*.28,.38,ivory if i%2==0 else a,parent,48)
        cylinder('Forum / glass drum',x,z+.25,2.05,1.28,.94,glass,parent,48)
        sphere('Forum / copper dome',x,z+.25,2.49,1.47,a,parent,scale=(1,1,.40))
        box('Forum / forecourt',x,z+2.65,.51,4.6,.55,.09,stone,parent)

# Central garden: negative space and a legible heart to the city.
box('Central garden / pavement',0,0,.38,9,7,.23,white,bevel=.15)
box('Central garden / lawn',-1.6,0,.53,3.5,5.8,.09,grass,bevel=.1)
box('Central garden / water',1.05,-.15,.53,1.9,4.8,.10,water,bevel=.13)
box('Central garden / boardwalk',2.6,0,.54,.65,5.7,.13,wood)
for z in [-2.2,0,2.2]:
    tree(-2.4,z)
    box('Garden / bench seat',-.15,z,.83,.4,1.0,.12,wood)
    box('Garden / bench base',-.15,z,.66,.3,.8,.24,stone)
cylinder('Garden / sundial pedestal',3.7,-2.1,.70,.34,.35,stone,vertices=24)
box('Garden / sundial blade',3.7,-2.1,1.28,.10,.5,1.0,accents['start'])
for x,z in [(-15,-11),(-15,-5),(-15,5),(-15,11),(15,-11),(15,-5),(15,5),(15,11),(-8,13),(8,-13)]:tree(x,z,small=True)

# Street furniture: deliberately placed, never random noise.
for x,z,rot in [(-5,-8,0),(6,1,0),(-1,-4,math.pi/2),(8,5,math.pi/2),(-5,10,0)]:
    o=box('Street / electric car',x,z,.62,.68,1.4,.58,white,bevel=.18);o.rotation_euler.z=rot
    o=box('Street / car roof',x,z,.93,.57,.72,.18,glass,bevel=.07);o.rotation_euler.z=rot
for x,z in [(-5,-12),(5,-12),(-5,3),(5,3),(-5,12),(5,12)]:
    cylinder('Street / lamp post',x,z,1.25,.035,1.9,dark,vertices=8)
    sphere('Street / lamp globe',x,z,2.25,.14,white)

scene=bpy.context.scene
scene.render.engine='BLENDER_EEVEE'
if scene.world is None:scene.world=bpy.data.worlds.new('Atlas / daylight environment')
scene.world.color=(.7,.7,.7)
scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs['Color'].default_value=(.83,.88,.84,1)
scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value=.65

def light(name,kind,loc,energy,size=5):
    data=bpy.data.lights.new(name,kind);data.energy=energy
    obj=bpy.data.objects.new(name,data);scene.collection.objects.link(obj);obj.location=loc
    if kind=='AREA':data.shape='DISK';data.size=size
    obj.rotation_euler=(Vector((0,0,0))-obj.location).to_track_quat('-Z','Y').to_euler()
    return obj

sun=light('Daylight / soft north sun','SUN',(-20,-20,40),2.4)
sun.data.angle=math.radians(18)
light('Daylight / broad fill','AREA',(20,10,25),1600,25)
cam_data=bpy.data.cameras.new('Atlas / delivery camera')
cam=bpy.data.objects.new('Atlas / delivery camera',cam_data);scene.collection.objects.link(cam)
cam.location=(34,-43,43)
cam.rotation_euler=(Vector((0,0,0))-cam.location).to_track_quat('-Z','Y').to_euler()
cam_data.type='ORTHO';cam_data.ortho_scale=48;scene.camera=cam
scene.render.resolution_x=800;scene.render.resolution_y=660;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG'
if hasattr(scene.render.image_settings,'media_type'):scene.render.image_settings.media_type='IMAGE'
scene.view_settings.view_transform='AgX'
scene.render.film_transparent=False
if 'artifacts' in globals() and globals().get('RENDER_PREVIEW',False):
    scene.eevee.taa_render_samples=8
    scene.eevee.use_raytracing=False
    scene.eevee.shadow_ray_count=1
    scene.eevee.shadow_step_count=4
    scene.render.resolution_x=640;scene.render.resolution_y=540
    target=artifacts.file(name='blockmap-city-preview.png',media_type='image/png')
    scene.render.filepath=target.path
    bpy.ops.render.render(write_still=True)
    target.publish()
result={'districts':len(districts),'objects':len(bpy.data.objects),'camera':cam.name,'coordinates':'Blender x,-z,height → glTF x,height,z','design':'Warm porcelain, sage landscape, unique district landmarks'}
