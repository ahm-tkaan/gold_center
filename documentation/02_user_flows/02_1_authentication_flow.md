# Kullanıcı Akışı: Kimlik Doğrulama (Authentication)

## 1. Genel Yaklaşım

Bu doküman, kullanıcıların platforma kayıt olma, giriş yapma, çıkış yapma ve şifrelerini sıfırlama süreçlerini adım adım tanımlar. Tüm bu işlemler için Supabase Auth'un sunduğu güvenli ve standart yöntemler kullanılacaktır.

**Kapsam Dışı:** Sosyal medya ile giriş (Google, Facebook vb.) özellikleri bu projenin ilk fazları için kapsam dışıdır ve daha sonra değerlendirilecektir.

## 2. Kullanıcı Kayıt Akışı (Sign Up)

**Amaç:** Yeni bir kullanıcının platforma güvenli bir şekilde kaydolmasını ve e-posta adresini doğrulamasını sağlamak.

| Adım | Aksiyon                                                                    | Teknik Uygulama                                                                                                       | Yönlendirme / Sonuç                                                                   |
| :--- | :------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| 1    | Kullanıcı, "Kayıt Ol" butonuna tıklar.                                     | Link -> `/kayit`                                                                                                      | Kullanıcı, kayıt formunun bulunduğu `/kayit` sayfasına yönlendirilir.                 |
| 2    | Kullanıcı, formdaki `İsim`, `Soyisim`, `E-posta`, `Şifre` alanlarını doldurur. | React Hook Form ile form yönetimi, Zod ile client-side validasyon (şifre gücü, e-posta formatı vb.).          | -                                                                                     |
| 3    | Kullanıcı, "Kayıt Ol" butonuna basar.                                      | `supabase.auth.signUp()` fonksiyonu çağrılır. E-posta ve şifre ile birlikte `data` objesi içinde isim/soyisim de gönderilir. | API isteği gönderilir. Kullanıcıya "Doğrulama e-postası gönderildi" mesajı gösterilir. |
| 4    | Supabase, kullanıcıya bir doğrulama linki içeren e-posta gönderir.           | Supabase'in yerleşik e-posta doğrulama özelliği. E-posta şablonu Supabase arayüzünden özelleştirilebilir. | Kullanıcı e-posta kutusunu kontrol eder.                                              |
| 5    | Kullanıcı, e-postadaki doğrulama linkine tıklar.                           | Supabase, kullanıcının `email_confirmed_at` alanını günceller.                                                        | Kullanıcı, "Hesabınız başarıyla doğrulandı" mesajının olduğu bir sayfaya yönlendirilir. |
| 6    | Veritabanı, yeni kullanıcı için otomatik olarak bir profil oluşturur.        | `on_auth_user_created` trigger'ı, `profiles` tablosuna yeni bir satır ekler.                                          | Veritabanı tutarlılığı sağlanır.                                                      |
| 7    | Kullanıcı artık platforma giriş yapabilir.                                 | -                                                                                                                     | Kullanıcı `/giris` sayfasına yönlendirilir.                                           |


## 3. Kullanıcı Giriş Akışı (Sign In)

**Amaç:** Kayıtlı bir kullanıcının kimliğini doğrulayarak oturum açmasını sağlamak.

| Adım | Aksiyon                                            | Teknik Uygulama                                                | Yönlendirme / Sonuç                                                          |
| :--- | :------------------------------------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| 1    | Kullanıcı, "Giriş Yap" butonuna tıklar.            | Link -> `/giris`                                               | Kullanıcı, giriş formunun bulunduğu `/giris` sayfasına yönlendirilir.        |
| 2    | Kullanıcı, `E-posta` ve `Şifre` alanlarını doldurur. | React Hook Form ve Zod ile validasyon.                         | -                                                                            |
| 3    | Kullanıcı, "Giriş Yap" butonuna basar.             | `supabase.auth.signInWithPassword()` fonksiyonu çağrılır.      | API isteği gönderilir. Hatalı girişte "E-posta veya şifre hatalı" uyarısı verilir. |
| 4    | Başarılı giriş sonrası oturum bilgileri saklanır.    | Supabase, JWT (JSON Web Token) içeren bir oturum bilgisini tarayıcının güvenli deposuna (LocalStorage/Cookie) kaydeder. | Kullanıcı kimliği doğrulanır ve oturum başlar.                               |
| 5    | Kullanıcı, ilgili sayfaya yönlendirilir.           | `useRouter` ile yönlendirme.                                   | Kullanıcı, ana sayfaya (`/`) veya "Hesabım" (`/hesabim`) sayfasına yönlendirilir. |

## 4. Kullanıcı Çıkış Akışı (Sign Out)

**Amaç:** Kullanıcının mevcut oturumunu güvenli bir şekilde sonlandırmak.

| Adım | Aksiyon                                 | Teknik Uygulama                           | Yönlendirme / Sonuç                                           |
| :--- | :-------------------------------------- | :---------------------------------------- | :------------------------------------------------------------ |
| 1    | Kullanıcı, "Çıkış Yap" butonuna tıklar. | Buton'un `onClick` eventi tetiklenir.     | -                                                             |
| 2    | Çıkış işlemi gerçekleştirilir.            | `supabase.auth.signOut()` fonksiyonu çağrılır. | API isteği gönderilir. Tarayıcıdaki oturum bilgileri silinir. |
| 3    | Kullanıcı, ana sayfaya yönlendirilir.   | `useRouter` ile yönlendirme.              | Kullanıcının oturumu sonlandırılır ve ana sayfaya döner.      |

## 5. Şifre Sıfırlama Akışı (Password Reset)

**Amaç:** Şifresini unutan bir kullanıcının şifresini güvenli bir şekilde yenilemesini sağlamak.

| Adım | Aksiyon                                                                        | Teknik Uygulama                                                    | Yönlendirme / Sonuç                                                                   |
| :--- | :----------------------------------------------------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| 1    | Kullanıcı, giriş sayfasındaki "Şifremi Unuttum" linkine tıklar.                  | Link -> `/sifremi-unuttum`                                         | Kullanıcı, e-posta giriş formunun olduğu `/sifremi-unuttum` sayfasına yönlendirilir. |
| 2    | Kullanıcı, kayıtlı olduğu e-posta adresini girer ve butona basar.                  | `supabase.auth.resetPasswordForEmail()` fonksiyonu çağrılır.       | Kullanıcıya "Şifre sıfırlama linki e-posta adresinize gönderildi" mesajı gösterilir. |
| 3    | Kullanıcı, e-postasına gelen şifre sıfırlama linkine tıklar.                     | Supabase, kullanıcıyı token içeren özel bir URL'e yönlendirir.      | Kullanıcı, yeni şifre oluşturma formunun olduğu `/sifre-guncelle` sayfasına gelir. |
| 4    | Kullanıcı, yeni şifresini iki kez girer ve "Şifreyi Güncelle" butonuna basar.     | `supabase.auth.updateUser()` fonksiyonu, `password` alanı ile çağrılır. | API isteği gönderilir.                                                                |
| 5    | Şifre başarıyla güncellenir.                                                   | -                                                                  | Kullanıcıya "Şifreniz başarıyla güncellendi" mesajı gösterilir ve `/giris` sayfasına yönlendirilir. | 