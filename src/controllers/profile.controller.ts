import { Hono } from "hono";
import { authMiddleware } from "@/middleware/auth.middlewre";
import { ConsoleLogWriter, eq } from "drizzle-orm";
import { db } from "@/db";
import { profiles } from "@/db/schema";

const profile = new Hono();

profile.use('*', authMiddleware);

profile.get("/", async (c) => {
   const payload = c.get('jwtPayload');
   const [profile] = await db.select().from(profiles).where(eq(profiles.userId, payload.userId));
    if (!profile) return c.json({ error: 'Profile not found' }, 404);

   return c.json({profile},200); 
 
  
})

profile.put('/', async (c) => {

    const body = await c.req.json() as {
      firstName: string,
      lastName: string,
      phoneNumber: string,
      adress: string,
    }
    
   
    try {
      const payload = c.get('jwtPayload');
      
      const [nuevoPerfil] = await db.update(profiles).set({
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,  
        address: body.adress,
      }).where(eq(profiles.userId,payload.userId)).returning()
      
      console.log('Perfil guardado exitosamente:', nuevoPerfil);
      return c.json({message:'Perfil creado'}, 201)
    } catch (dbError: any) {
      console.error('Error al guardar en BD:', dbError);
      
      
      return c.json({
        success: false,
        error: 'Error de base de datos',
        message: 'No se pudo guardar el perfil. Intenta nuevamente.'
      }, 500)
    }
     
  
})
profile.delete('/', async (c) => {
   const {userId} = c.get('jwtPayload') 
   try { 
      await db.delete(profiles).where(eq(profiles.userId, userId));
      return c.json({message:'Su perfil fue eliminado exitosamente'} ,201)
   } catch (error) {
       return c.json({
        success: false,
        error: 'Error de base de datos',
        message: 'No se pudo eliminar el perfil. Intenta nuevamente.'
      }, 404)
   }

} )

export default profile;